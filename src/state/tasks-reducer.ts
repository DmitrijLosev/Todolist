import {TasksStateType} from "../App";
import {v1} from "uuid";

//TYPES
export type TaskActionsType =
    ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof deleteTodoAC>
    | ReturnType<typeof addTodoAC>

export const todolistsId1=v1();
export const  todolistsId2=v1();
const initialState={} as TasksStateType


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
        case "DELETE-TODOLIST" :
            const copyState={...state}
            delete copyState[action.payload.todoId]
            return copyState
        case "ADD-TODOLIST" :
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
export const deleteTodoAC = (todoId: string) => ({type: "DELETE-TODOLIST", payload: {todoId}}) as const
export const addTodoAC = (todolistTitle: string,newTodolistId:string) => ({
    type: "ADD-TODOLIST",
    payload: {todolistTitle, newTodolistId}
}) as const;
