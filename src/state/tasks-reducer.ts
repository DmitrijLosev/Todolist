import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {TodolistType} from "./todolist-reducer";

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
                ...state, [action.payload.todoId]: [{
                    id: v1(),
                    title: action.payload.newTaskTitle,
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    description:"",
                    startDate: "",
                    deadline: "",
                    todoListId: action.payload.todoId,
                    order: 0,
                    addedDate: ""
                }, ...state[action.payload.todoId]]
            }
        case "CHANGE-TASK-TITLE" :
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            }
        case "CHANGE-TASK-STATUS" :
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    status: action.payload.status
                } : t)
            }
        case "DELETE-TODOLIST" :
            const copyState = {...state}
            delete copyState[action.payload.todoId]
            return copyState
        case "ADD-TODOLIST" :
            return {...state, [action.payload.newTodolistId]: []}
        case "SET-TODOLISTS":
            debugger
            const newState:TasksStateType={};
            action.payload.todolists.forEach(t=>newState[t.id]=[])
            return newState
        default:
            return state
    }
}

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
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoId: string) => ({
    type: "CHANGE-TASK-STATUS",
    payload: {taskId, status, todoId}
}) as const;
export const deleteTodoAC = (todoId: string) => ({type: "DELETE-TODOLIST", payload: {todoId}}) as const
export const addTodoAC = (todolistTitle: string, newTodolistId: string) => ({
    type: "ADD-TODOLIST",
    payload: {todolistTitle, newTodolistId}
}) as const;
export const setTodolistsAC = (todolists:TodolistType[]) => ({
    type: "SET-TODOLISTS",
    payload: {todolists}
}) as const;

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
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof deleteTodoAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof setTodolistsAC>