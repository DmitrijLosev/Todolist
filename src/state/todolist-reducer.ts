import {todolistsApi} from "../api/todolists-api";
import {ThunkCommonType} from "./store";
import {
    RequestStatusType,
    setAppStatusAC,
    AppActionsType
} from "./app-reducer";
import {fetchTasksTC} from "./tasks-reducer";
import {handleAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = [] as TodolistAppType[]

export const todolistReducer = (state: TodolistAppType[] = initialState, action: TodoActionsType): TodolistAppType[] => {
    switch (action.type) {
        case "TODOLIST/DELETE-TODOLIST" :
            return state.filter(t => t.id !== action.payload.todoId)
        case "TODOLIST/ADD-TODOLIST" :
            return [{...action.payload.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case "TODOLIST/CHANGE-TODOLIST-TITLE" :
            return state.map(t => t.id === action.payload.todolistId
                ? {...t, title: action.payload.newTodolistTitle} : t)
        case "TODOLIST/CHANGE-TODOLIST-FILTER" :
            return state.map(t => t.id === action.payload.todolistId
                ? {...t, filter: action.payload.newTodolistFilter} : t)
        case "TODOLIST/SET-TODOLIST-ENTITY-STATUS" :
            return state.map(t => t.id === action.payload.todolistId
                ? {...t, entityStatus: action.payload.status} : t)
        case "TODOLIST/SET-TODOLISTS":
            return action.payload.todolists.map(t => ({...t, filter: "all" as FilterType, entityStatus: "idle"}))
        case "APP/LOGOUT":
            return []
        default:
            return state
    }
}

export const deleteTodoAC = (todoId: string) => ({type: "TODOLIST/DELETE-TODOLIST", payload: {todoId}}) as const
export const addTodoAC = (todolist: TodolistType) => ({
    type: "TODOLIST/ADD-TODOLIST",
    payload: {todolist}
}) as const;
export const changeTodoTitleAC = (todolistId: string, newTodolistTitle: string) => ({
    type: "TODOLIST/CHANGE-TODOLIST-TITLE",
    payload: {todolistId, newTodolistTitle}
}) as const;
export const changeTodoFilterAC = (todolistId: string, newTodolistFilter: FilterType) => ({
    type: "TODOLIST/CHANGE-TODOLIST-FILTER",
    payload: {todolistId, newTodolistFilter}
}) as const;
export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: "TODOLIST/SET-TODOLISTS",
    payload: {todolists}
}) as const;
export const setTodolistEntityStatus = (todolistId: string, status: RequestStatusType) => ({
    type: "TODOLIST/SET-TODOLIST-ENTITY-STATUS",
    payload: {status, todolistId}
}) as const;


export const fetchTodolistsTC = (): ThunkCommonType => async (dispatch, getState) => {
    try {
        dispatch(setAppStatusAC("loading"))
        let data = await todolistsApi.getTodolists()
        dispatch(setTodolistsAC(data))
        data.forEach(tl => dispatch(fetchTasksTC(tl.id)))
        if (getState().app.status === "loading") {
            dispatch(setAppStatusAC("succeeded"))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const addTodolistTC = (title: string): ThunkCommonType => async dispatch => {
    try {
        dispatch(setAppStatusAC("loading"))
        let res = await todolistsApi.createTodolist(title)
        if (res.resultCode === 0) {
            dispatch(addTodoAC(res.data.item))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleAppError<{ item: TodolistType }>(res, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const deleteTodolistTC = (todolistId: string): ThunkCommonType => async dispatch => {
    try {
        dispatch(setAppStatusAC("loading"))
        dispatch(setTodolistEntityStatus(todolistId, "loading"))
        let res = await todolistsApi.deleteTodolist(todolistId)
        if (res.resultCode === 0) {
            dispatch(deleteTodoAC(todolistId))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleAppError(res, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const changeTodolistTitleTC = (todolistId: string, newTitle: string): ThunkCommonType => async dispatch => {
    try {
        dispatch(setAppStatusAC("loading"))
        dispatch(setTodolistEntityStatus(todolistId, "loading"))
        let res = await todolistsApi.updateTodolistTitle(todolistId, newTitle)
        if (res.resultCode === 0) {
            dispatch(changeTodoTitleAC(todolistId, newTitle))
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setTodolistEntityStatus(todolistId, "succeeded"))
        } else {
            handleAppError(res, dispatch)
            dispatch(setTodolistEntityStatus(todolistId, "failed"))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        dispatch(setTodolistEntityStatus(todolistId, "failed"))
    }
}

export type FilterType = "all" | "active" | "completed"
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type TodolistAppType = TodolistType & { filter: FilterType, entityStatus: RequestStatusType }
export type TodoActionsType =
    DeleteTodoACType
    | AddTodoACType
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC> | SetTodolistEntityStatusType
    | SetTodolistsACType | AppActionsType

export type AddTodoACType = ReturnType<typeof addTodoAC>
export type DeleteTodoACType = ReturnType<typeof deleteTodoAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type SetTodolistEntityStatusType = ReturnType<typeof setTodolistEntityStatus>