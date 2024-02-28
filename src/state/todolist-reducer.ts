import {todolistsApi} from "../api/todolists-api";
import {ThunkCommonType} from "./store";
import {logout, RequestStatusType, setAppStatus,} from "./app-reducer";
import {fetchTasksTC} from "./tasks-reducer";
import {handleAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = [] as TodolistAppType[]

const slice = createSlice({
    name:"todolists",
    initialState:initialState,
    reducers:{
        deleteTodolist(state, action:PayloadAction<{todoId:string}>) {
           /* state.filter(t => t.id !== action.payload.todoId)*/
            const index = state.findIndex(t=>t.id === action.payload.todoId)
            if(index>-1) {
                state.splice(index,1)
            }
        },
        addTodolist(state, action:PayloadAction<{todolist: TodolistType}>) {
            /*state = [{...action.payload.todolist, filter: "all", entityStatus: "idle"}, ...state]*/
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodoTitle(state, action:PayloadAction<{todolistId: string, newTodolistTitle: string}>) {
            /*state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.newTodolistTitle} : t)*/
            const index = state.findIndex(t=> t.id === action.payload.todolistId);
            if(index > -1) {
                state[index].title = action.payload.newTodolistTitle
            }
        },
        changeTodoFilter(state,action:PayloadAction<{todolistId: string, newTodolistFilter: FilterType}>) {
            // state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.newTodolistFilter} : t)
            const index = state.findIndex(t=> t.id === action.payload.todolistId);
            if(index > -1) {
                state[index].filter = action.payload.newTodolistFilter
            }
        },
        setTodolists(state, action:PayloadAction<{todolists: TodolistType[]}>) {
           return action.payload.todolists.map(t => ({...t, filter: "all" as FilterType, entityStatus: "idle"}))
        },
        setTodolistEntityStatus(state, action:PayloadAction<{todolistId: string, status: RequestStatusType}>) {
            /*state.map(t => t.id === action.payload.todolistId ? {...t, entityStatus: action.payload.status} : t)*/
            const index = state.findIndex(t=> t.id === action.payload.todolistId);
            if(index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },

    },
    extraReducers:(builder) => {
       builder.addCase(logout,()=>{return []})
    }
})

export const todolistReducer = slice.reducer;
export const {deleteTodolist,
    changeTodoTitle,
    addTodolist,
    changeTodoFilter,
    setTodolistEntityStatus,
    setTodolists
} = slice.actions;


/*export const todolistReducer = (state: TodolistAppType[] = initialState, action: TodoActionsType): TodolistAppType[] => {
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
}) as const;*/


export const fetchTodolistsTC = (): ThunkCommonType => async (dispatch, getState) => {
    try {
        dispatch(setAppStatus({status:"loading"}))
        let data = await todolistsApi.getTodolists()
        dispatch(setTodolists({todolists:data}))
        data.forEach(tl => dispatch(fetchTasksTC(tl.id)))
        if (getState().app.status === "loading") {
            dispatch(setAppStatus({status:"succeeded"}))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const addTodolistTC = (title: string): ThunkCommonType => async dispatch => {
    try {
        dispatch(setAppStatus({status:"loading"}))
        let res = await todolistsApi.createTodolist(title)
        if (res.resultCode === 0) {
            dispatch(addTodolist({todolist:res.data.item}))
            dispatch(setAppStatus({status:"succeeded"}))
        } else {
            handleAppError<{ item: TodolistType }>(res, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const deleteTodolistTC = (todolistId: string): ThunkCommonType => async dispatch => {
    try {
        dispatch(setAppStatus({status:"loading"}))
        dispatch(setTodolistEntityStatus({todolistId, status:"loading"}))
        let res = await todolistsApi.deleteTodolist(todolistId)
        if (res.resultCode === 0) {
            dispatch(deleteTodolist({todoId:todolistId}))
            dispatch(setAppStatus({status:"succeeded"}))
        } else {
            handleAppError(res, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const changeTodolistTitleTC = (todolistId: string, newTitle: string): ThunkCommonType => async dispatch => {
    try {
        dispatch(setAppStatus({status:"loading"}))
        dispatch(setTodolistEntityStatus({todolistId, status:"loading"}))
        let res = await todolistsApi.updateTodolistTitle(todolistId, newTitle)
        if (res.resultCode === 0) {
            dispatch(changeTodoTitle({todolistId, newTodolistTitle:newTitle}))
            dispatch(setAppStatus({status:"succeeded"}))
            dispatch(setTodolistEntityStatus({todolistId, status:"succeeded"}))
        } else {
            handleAppError(res, dispatch)
            dispatch(setTodolistEntityStatus({todolistId, status:"failed"}))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        dispatch(setTodolistEntityStatus({todolistId, status:"failed"}))
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
