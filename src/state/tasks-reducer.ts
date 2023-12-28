import {TasksStateType} from "../App";
import {v1} from "uuid";

//TYPES
export type TaskActionsType =
    ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof deleteTodoAllTasksAC>
    | ReturnType<typeof addEmptyTaskListAC>

export const todolistsId1=v1();
export const  todolistsId2=v1();
const initialState={
    [todolistsId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}],
    [todolistsId2]: [
        {id: v1(), title: "Beer", isDone: true},
        {id: v1(), title: "Dry fish", isDone: false},
        {id: v1(), title: "Chips", isDone: true}
    ]
} as TasksStateType


//REDUCER LOGIC
export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case "DELETE-TASK" :
            return {...state, [action.payload.todoId]: state[action.payload.todoId].filter(t => t.id !== action.payload.id)}
        case "ADD-TASK" :
            return {...state, [action.payload.todoId]: [{id: v1(), title: action.payload.newTaskTitle, isDone: false}, ...state[action.payload.todoId]]}
        case "CHANGE-TASK-TITLE" :
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)}
        case "CHANGE-TASK-STATUS" :
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.idIsDone ? {...t, isDone: action.payload.isRealDone} : t)}
        case "DELETE-TODO-ALL-TASKS" :
            const copyState={...state}
            delete copyState[action.payload.id]
            return copyState
        case "ADD-EMPTY-TASK-LIST" :
            return {...state, [action.payload.newTodolistId]: []}
        default:
            return state
    }
}

//ACTION CREATORS
export const deleteTaskAC = (todoId: string, id: string) => ({
    type: "DELETE-TASK",
    payload: {todoId, id}
}) as const;
export const addTaskAC = (newTaskTitle: string, todoId: string) => ({
    type: "ADD-TASK",
    payload: {newTaskTitle, todoId}
}) as const;
export const changeTaskTitleAC = (todoId: string, taskId: string, newTitle: string) => ({
    type: "CHANGE-TASK-TITLE",
    payload: {todoId, taskId, newTitle}
}) as const;
export const changeTaskStatusAC = (idIsDone: string, isRealDone: boolean, todoId: string) => ({
    type: "CHANGE-TASK-STATUS",
    payload: {idIsDone, isRealDone, todoId}
}) as const;
export const deleteTodoAllTasksAC = (id: string) => ({
    type: "DELETE-TODO-ALL-TASKS",
    payload: {id}
}) as const;
export const addEmptyTaskListAC = (newTodolistId:string) => ({
    type: "ADD-EMPTY-TASK-LIST",
    payload: {newTodolistId}
}) as const;
