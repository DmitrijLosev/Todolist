import {TodolistType} from "../App";
import {FilterType} from "../TodoList";
import {todolistsId1, todolistsId2} from "./tasks-reducer";

//TYPES
export type TodoActionsType =
    ReturnType<typeof deleteTodoAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>

const initialState=[
    {id: todolistsId1, title: "What to learn", filter: "all"},
    {id: todolistsId2, title: "What to buy", filter: "all"}
] as TodolistType[]
//REDUCER LOGIC
export const todolistReducer = (state: TodolistType[] = initialState, action: TodoActionsType): TodolistType[] => {
    switch (action.type) {
        case "DELETE-TODOLIST" :
            return state.filter(t => t.id !== action.payload.todoId)
        case "ADD-TODOLIST" :
            return [{id: action.payload.newTodolistId, title: action.payload.todolistTitle, filter: "all"}, ...state]
        case "CHANGE-TODOLIST-TITLE" :
            return state.map(t => t.id === action.payload.todolistId
                ? {...t, title: action.payload.newTodolistTitle} : t)
        case "CHANGE-TODOLIST-FILTER" :
            return state.map(t => t.id === action.payload.todolistId
                ? {...t, filter: action.payload.newTodolistFilter} : t)
        default:
            return state
    }
}

//ACTION CREATORS
export const deleteTodoAC = (todoId: string) => ({type: "DELETE-TODOLIST", payload: {todoId}}) as const
export const addTodoAC = (todolistTitle: string,newTodolistId:string) => ({
    type: "ADD-TODOLIST",
    payload: {todolistTitle, newTodolistId}
}) as const;
export const changeTodoTitleAC = (todolistId: string, newTodolistTitle: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    payload: {todolistId, newTodolistTitle}
}) as const;
export const changeTodoFilterAC = (todolistId: string, newTodolistFilter: FilterType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {todolistId, newTodolistFilter}
}) as const;

