import {TodolistType} from "../App";
import {FilterType} from "../TodoList";

//TYPES
export type TodoActionsType =
    DeleteTodoActionType
    | AddTodoActionType
    | ChangeTodoTitleActionType
    | ChangeTodoFilterActionType
type DeleteTodoActionType = {
    type: "DELETE-TODOLIST",
    payload: { todoId: string }
}
type AddTodoActionType = {
    type: "ADD-TODOLIST"
    payload: { todolistTitle: string ,newTodolistId:string}
}
type ChangeTodoTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    payload: {
        todolistId: string
        newTodolistTitle: string
    }

}
type ChangeTodoFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    payload: {
        todolistId: string
        newTodolistFilter: FilterType
    }
}

//REDUCER LOGIC
export const todolistReducer = (state: TodolistType[], action: TodoActionsType): TodolistType[] => {
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
            throw new Error("I don't understand action type")
    }
}

//ACTION CREATORS
export const deleteTodoAC = (todoId: string): DeleteTodoActionType => ({type: "DELETE-TODOLIST", payload: {todoId}})
export const addTodoAC = (todolistTitle: string,newTodolistId:string): AddTodoActionType => ({
    type: "ADD-TODOLIST",
    payload: {todolistTitle, newTodolistId}
})
export const changeTodoTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodoTitleActionType => ({
    type: "CHANGE-TODOLIST-TITLE",
    payload: {todolistId, newTodolistTitle}
})
export const changeTodoFilterAC = (todolistId: string, newTodolistFilter: FilterType): ChangeTodoFilterActionType => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {todolistId, newTodolistFilter}
})

