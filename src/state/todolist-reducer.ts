import {TodolistType} from "../App";
import {v1} from "uuid";
import {FilterType} from "../TodoList";

//TYPES
type ActionsType = DeleteTodoActionType | AddTodoActionType | ChangeTodoTitleActionType | ChangeTodoFilterActionType
type DeleteTodoActionType = {
    type: "DELETE-TODOLIST",
    todoId: string
}
type AddTodoActionType = {
    type: "ADD-TODOLIST"
    todolistTitle: string
}
type ChangeTodoTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    todolistId: string
    newTodolistTitle: string
}
type ChangeTodoFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    todolistId: string
    newTodolistFilter: FilterType
}

//REDUCER LOGIC
export const todolistReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "DELETE-TODOLIST" :
            return state.filter(t => t.id !== action.todoId)
        case "ADD-TODOLIST" :
            return [{id: v1(), title: action.todolistTitle, filter: "all"}, ...state]
        case "CHANGE-TODOLIST-TITLE" :
            return state.map(t => t.id === action.todolistId
                ? {...t, title: action.newTodolistTitle} : t)
        case "CHANGE-TODOLIST-FILTER" :
            return state.map(t => t.id === action.todolistId
                ? {...t, filter: action.newTodolistFilter} : t)
        default:
            throw new Error("I don't understand action type")
    }
}

//ACTION CREATORS
export const deleteTodoAC =(todoId: string):DeleteTodoActionType=> ({type: "DELETE-TODOLIST", todoId})
export const addTodoAC=(todolistTitle:string):AddTodoActionType=>({type: "ADD-TODOLIST", todolistTitle})
export const changeTodoTitleAC=(todolistId: string,newTodolistTitle: string):ChangeTodoTitleActionType=>({type: "CHANGE-TODOLIST-TITLE", todolistId, newTodolistTitle})
export const changeTodoFilterAC=(todolistId: string,newTodolistFilter: FilterType):ChangeTodoFilterActionType=>({type: "CHANGE-TODOLIST-FILTER", todolistId, newTodolistFilter})

