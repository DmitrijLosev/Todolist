import {TaskPriorities, TaskStatuses, todolistsApi} from "../api/todolists-api";
import {ThunkCommonType} from "./store";
import {addTodolist, deleteTodolist, setTodolistEntityStatus, setTodolists, TodolistType} from "./todolist-reducer";
import {setAppStatus, RequestStatusType, logout} from "./app-reducer";
import {handleAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {} as TasksStateType

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        deleteTask(state, action: PayloadAction<{ todoId: string, id: string }>) {
            const tasks = state[action.payload.todoId];
            const index = tasks.findIndex(t => t.id === action.payload.id);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTask(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift({
                ...action.payload.task,
                entityTaskStatus: "idle" as RequestStatusType
            })
        },
        changeTaskProperty(state, action: PayloadAction<{ task: TaskType }>) {
            const changedTask = {...action.payload.task, entityTaskStatus: "idle" as RequestStatusType}
            const tasks = state[action.payload.task.todoListId];
            const index = tasks.findIndex(t => t.id === action.payload.task.id)
            if (index > -1) {
                tasks[index] = changedTask
            }
        },
        setTasks(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, entityTaskStatus: "idle"}))
        },
        setTasksEntityStatus(state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            status: RequestStatusType
        }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index].entityTaskStatus = action.payload.status
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(deleteTodolist,
            (state, action: PayloadAction<{ todoId: string }>) => {
                delete state[action.payload.todoId]
            });
        builder.addCase(addTodolist,
            (state, action: PayloadAction<{ todolist: TodolistType }>) => {
                state[action.payload.todolist.id] = []
            });
        builder.addCase(setTodolists,
            (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
                action.payload.todolists.forEach(t => state[t.id] = [])
            });
        builder.addCase(logout,
            () => {
                return {}
            })
    }
})

export const tasksReducer = slice.reducer;
export const {
    deleteTask,
    addTask,
    changeTaskProperty,
    setTasks,
    setTasksEntityStatus,
} = slice.actions;


/*export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case "TASK/DELETE-TASK" :
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(t => t.id !== action.payload.id)
            }
        case "TASK/ADD-TASK" :
            return {
                ...state,
                [action.payload.task.todoListId]: [{...action.payload.task,entityTaskStatus:"idle"},
                    ...state[action.payload.task.todoListId]]
            }
        case "TASK/CHANGE-TASK-PROPERTY" :
            return {
                ...state,
                [action.payload.task.todoListId]: state[action.payload.task.todoListId].map(t =>
                    t.id === action.payload.task.id ? {...action.payload.task,entityTaskStatus:"idle"} : t)
            }
        case "TODOLIST/DELETE-TODOLIST" :
            const copyState = {...state}
            delete copyState[action.payload.todoId]
            return copyState
        case "TODOLIST/ADD-TODOLIST" :
            return {...state, [action.payload.todolist.id]: []}
        case "TODOLIST/SET-TODOLISTS":
            const newState: TasksStateType = {};
            action.payload.todolists.forEach(t => newState[t.id] = [])
            return newState;
        case "TASK/SET-TASKS":
            return {...state, [action.payload.todolistId]: action.payload.tasks.map(t=>({...t,entityTaskStatus:"idle"}))}
        case "APP/LOGOUT":
            return {}
        case "TASK/SET-TASK-ENTITY-STATUS" :
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t=> t.id===action.payload.taskId ? {...t,entityTaskStatus:action.payload.status} : t)}
        default:
            return state
    }
}

export const deleteTaskAC = (todoId: string, id: string) => ({
    type: "TASK/DELETE-TASK",
    payload: {todoId, id}
}) as const;
export const addTaskAC = (task: TaskType) => ({
    type: "TASK/ADD-TASK",
    payload: {task}
}) as const;
export const changeTaskPropertyAC = (task: TaskType) => ({
    type: "TASK/CHANGE-TASK-PROPERTY",
    payload: {task}
}) as const;
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: "TASK/SET-TASKS",
    payload: {todolistId, tasks}
}) as const;
export const setTasksEntityStatusAC = (todolistId: string, taskId: string, status:RequestStatusType) => ({
    type: "TASK/SET-TASK-ENTITY-STATUS",
    payload: {todolistId, taskId, status}
}) as const;*/


export const fetchTasksTC = (todolistId: string): ThunkCommonType =>
    async dispatch => {
        try {
            let data = await todolistsApi.getTasks(todolistId)
            dispatch(setTasks({todolistId, tasks: data.items}))
        } catch (error) {
            handleServerNetworkError(error, dispatch)
        }
    }

export const deleteTaskTC = (todolistId: string, taskId: string): ThunkCommonType =>
    async dispatch => {
        try {
            dispatch(setAppStatus({status: "loading"}))
            dispatch(setTasksEntityStatus({todolistId, taskId, status: "loading"}))
            let res = await todolistsApi.deleteTask(todolistId, taskId)
            if (res.resultCode === 0) {
                dispatch(deleteTask({todoId: todolistId, id: taskId}))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleAppError(res, dispatch)
                dispatch(setTasksEntityStatus({todolistId, taskId, status: "failed"}))
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            dispatch(setTasksEntityStatus({todolistId, taskId, status: "failed"}))
        }
    }

export const addTaskTC = (taskTitle: string, todolistId: string): ThunkCommonType =>
    async dispatch => {
        try {
            dispatch(setAppStatus({status: "loading"}))
            dispatch(setTodolistEntityStatus({todolistId, status: "loading"}))
            let res = await todolistsApi.createTask(taskTitle, todolistId)
            if (res.resultCode === 0) {
                dispatch(addTask({task: res.data.item}))
                dispatch(setAppStatus({status: "succeeded"}))
                dispatch(setTodolistEntityStatus({todolistId, status: "succeeded"}))
            } else {
                handleAppError<{ item: TaskType }>(res, dispatch)
                dispatch(setTodolistEntityStatus({todolistId, status: "failed"}))
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            dispatch(setTodolistEntityStatus({todolistId, status: "failed"}))
        }
    }

export const changeTaskPropertyTC = (taskId: string, todolistId: string, property: PropertyType): ThunkCommonType =>
    async (dispatch, getState) => {
        try {
            dispatch(setAppStatus({status: "loading"}))
            dispatch(setTasksEntityStatus({todolistId, taskId, status: "loading"}))
            const {
                id, todoListId, order, addedDate,
                ...TaskModel
            } = getState().tasks[todolistId].filter(t => t.id === taskId)[0]
            const UpdateTaskModel = {...TaskModel, ...property}
            let res = await todolistsApi.updateTask(todolistId, taskId, UpdateTaskModel)
            if (res.resultCode === 0) {
                dispatch(changeTaskProperty({task: res.data.item}))
                dispatch(setAppStatus({status: "succeeded"}))
                dispatch(setTasksEntityStatus({todolistId, taskId, status: "succeeded"}))
            } else {
                handleAppError<{ item: TaskType }>(res, dispatch)
                dispatch(setTasksEntityStatus({todolistId, taskId, status: "failed"}))
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            dispatch(setTasksEntityStatus({todolistId, taskId, status: "failed"}))
        }
    }

export type PropertyType = { status: TaskStatuses } | { title: string }

export type TaskType = {
    description: string | null
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TaskDomainType = TaskType & { entityTaskStatus: RequestStatusType }
export type TasksStateType = {
    [key: string]: TaskDomainType[]
}


