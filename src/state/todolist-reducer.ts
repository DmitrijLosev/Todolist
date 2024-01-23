import {todolistsApi} from "../api/todolists-api";
import {RootStateType, ThunkCommonType} from "./store";
import {ThunkDispatch} from "redux-thunk";

const initialState=[] as TodolistAppType[]

export const todolistReducer = (state: TodolistAppType[] = initialState, action: TodoActionsType): TodolistAppType[] => {
    switch (action.type) {
        case "DELETE-TODOLIST" :
            return state.filter(t => t.id !== action.payload.todoId)
        case "ADD-TODOLIST" :
            return [{...action.payload.todolist,filter:"all"}, ...state]
        case "CHANGE-TODOLIST-TITLE" :
            return state.map(t => t.id === action.payload.todolistId
                ? {...t, title: action.payload.newTodolistTitle} : t)
        case "CHANGE-TODOLIST-FILTER" :
            return state.map(t => t.id === action.payload.todolistId
                ? {...t, filter: action.payload.newTodolistFilter} : t)
        case "SET-TODOLISTS":
            return action.payload.todolists.map(t=>({...t, filter:"all" as FilterType}))
        default:
            return state
    }
}

export const deleteTodoAC = (todoId: string) => ({type: "DELETE-TODOLIST", payload: {todoId}}) as const
export const addTodoAC = (todolist:TodolistType) => ({
    type: "ADD-TODOLIST",
    payload: {todolist}
}) as const;
export const changeTodoTitleAC = (todolistId: string, newTodolistTitle: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    payload: {todolistId, newTodolistTitle}
}) as const;
export const changeTodoFilterAC = (todolistId: string, newTodolistFilter: FilterType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {todolistId, newTodolistFilter}
}) as const;
export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: "SET-TODOLISTS",
    payload: {todolists}
}) as const;


export type FilterType = "all" | "active" | "completed"
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type TodolistAppType = TodolistType & {filter:FilterType}
export type TodoActionsType =
    ReturnType<typeof deleteTodoAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>
    | ReturnType<typeof setTodolistsAC>

export const fetchTodolistsTC = ():ThunkCommonType<TodoActionsType> => async (dispatch:ThunkDispatch<RootStateType,unknown,TodoActionsType>)=>{
   let data= await todolistsApi.getTodolists()
    dispatch(setTodolistsAC(data))
}
export const addTodolistTC = (title:string):ThunkCommonType<TodoActionsType> => async (dispatch:ThunkDispatch<RootStateType,unknown,TodoActionsType>)=>{
    let res= await todolistsApi.createTodolist(title)
    if(res.resultCode === 0){
        dispatch(addTodoAC(res.data.item))
    }
}

export const deleteTodolistTC = (todolistId:string):ThunkCommonType<TodoActionsType> => async (dispatch:ThunkDispatch<RootStateType,unknown,TodoActionsType>)=>{
    let res= await todolistsApi.deleteTodolist(todolistId)
    if(res.resultCode === 0){
        dispatch(deleteTodoAC(todolistId))
    }
}
export const ChangeTodolistTitleTC = (todolistId:string,newTitle:string):ThunkCommonType<TodoActionsType> => async (dispatch:ThunkDispatch<RootStateType,unknown,TodoActionsType>)=>{
    let res= await todolistsApi.updateTodolistTitle(todolistId,newTitle)
    if(res.resultCode === 0){
        dispatch(changeTodoTitleAC(todolistId,newTitle))
    }
}