import {TaskPriorities, TaskStatuses, todolistsApi} from "../api/todolists-api";
import {RootStateType, ThunkCommonType} from "./store";
import {ThunkDispatch} from "redux-thunk";
import {
    addTodoAC,
    deleteTodoAC,
    setTodolistEntityStatus,
    SetTodolistEntityStatusType,
    setTodolistsAC
} from "./todolist-reducer";
import {SetErrorActionType, setAppStatusAC, SetStatusActionType} from "./app-reducer";
import {handleAppError, handleServerNetworkError} from "../utils/error-utils";


const initialState = {} as TasksStateType

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case "DELETE-TASK" :
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(t => t.id !== action.payload.id)
            }
        case "ADD-TASK" :
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case "CHANGE-TASK-PROPERTY" :
            return {
                ...state,
                [action.payload.task.todoListId]: state[action.payload.task.todoListId].map(t =>
                    t.id === action.payload.task.id ? action.payload.task : t)
            }
        case "DELETE-TODOLIST" :
            const copyState = {...state}
            delete copyState[action.payload.todoId]
            return copyState
        case "ADD-TODOLIST" :
            return {...state, [action.payload.todolist.id]: []}
        case "SET-TODOLISTS":
            const newState: TasksStateType = {};
            action.payload.todolists.forEach(t => newState[t.id] = [])
            return newState;
        case "SET-TASKS":
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        default:
            return state
    }
}

export const deleteTaskAC = (todoId: string, id: string) => ({
    type: "DELETE-TASK",
    payload: {todoId, id}
}) as const;
export const addTaskAC = (task: TaskType) => ({
    type: "ADD-TASK",
    payload: {task}
}) as const;
export const changeTaskPropertyAC = (task: TaskType) => ({
    type: "CHANGE-TASK-PROPERTY",
    payload: {task}
}) as const;
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: "SET-TASKS",
    payload: {todolistId, tasks}
}) as const;


export const fetchTasksTC = (todolistId: string): ThunkCommonType<TaskActionsType> =>
    async (dispatch: ThunkDispatch<RootStateType, unknown, TaskActionsType>) => {
        try {
            let data = await todolistsApi.getTasks(todolistId)
            dispatch(setTasksAC(todolistId, data.items))
        } catch (error) {
            handleServerNetworkError(error, dispatch)
        }
    }

export const deleteTaskTC = (todolistId: string, taskId: string): ThunkCommonType<TaskActionsType> =>
    async (dispatch: ThunkDispatch<RootStateType, unknown, TaskActionsType>) => {
        try {
            dispatch(setAppStatusAC("loading"))
            let res = await todolistsApi.deleteTask(todolistId, taskId)
            if (res.resultCode === 0) {
                dispatch(deleteTaskAC(todolistId, taskId))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleAppError(res, dispatch)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
        }
    }

export const addTaskTC = (taskTitle: string, todolistId: string): ThunkCommonType<TaskActionsType> =>
    async (dispatch: ThunkDispatch<RootStateType, unknown, TaskActionsType>) => {
        try {
            dispatch(setAppStatusAC("loading"))
            dispatch(setTodolistEntityStatus( todolistId,"loading"))
            let res = await todolistsApi.createTask(taskTitle, todolistId)
            if (res.resultCode === 0) {
                dispatch(addTaskAC(res.data.item))
                dispatch(setAppStatusAC("succeeded"))
                dispatch(setTodolistEntityStatus( todolistId,"succeeded"))
            } else {
                handleAppError<{ item: TaskType }>(res, dispatch)
                dispatch(setTodolistEntityStatus( todolistId,"failed"))
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            dispatch(setTodolistEntityStatus( todolistId,"failed"))
        }
    }

export const changeTaskPropertyTC = (taskId: string, todolistId: string, property: PropertyType): ThunkCommonType<TaskActionsType> =>
    async (dispatch: ThunkDispatch<RootStateType, unknown, TaskActionsType>, getState: () => RootStateType) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const {
                id, todoListId, order, addedDate,
                ...TaskModel
            } = getState().tasks[todolistId].filter(t => t.id === taskId)[0]
            const UpdateTaskModel = {...TaskModel, ...property}
            let res = await todolistsApi.updateTask(todolistId, taskId, UpdateTaskModel)
            if (res.resultCode === 0) {
                dispatch(changeTaskPropertyAC(res.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleAppError<{ item: TaskType }>(res, dispatch)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
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
export type TasksStateType = {
    [key: string]: TaskType[]
}
export type TaskActionsType =
    ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskPropertyAC>
    | ReturnType<typeof deleteTodoAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC> | SetErrorActionType | SetStatusActionType |SetTodolistEntityStatusType

