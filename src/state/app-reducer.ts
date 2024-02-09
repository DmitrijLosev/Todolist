import {ThunkCommonType} from "./store";
import {todolistsApi, UserDataType} from "../api/todolists-api";
import {toggleIsLeggedInActionType, toggleIsLoggedInAC} from "./login-reducer";
import {handleServerNetworkError} from "../utils/error-utils";

const InitialState: InitialStateType = {
   status:"idle",
    error:null,
    isAppInitialized:false,
    userData: null as UserDataType | null
}

export  const appReducer = (state:InitialStateType=InitialState,action:AppActionsType):InitialStateType =>{
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state,status:action.payload.status}
        case "APP/SET-ERROR":
            return {...state,error:action.payload.error}
        case "APP/SET-IS-APP-INITIALIZED":
            return {...state,isAppInitialized:action.payload.value}
        case "APP/SET-USER-DATA" : {
            return {...state, userData:action.payload.userData}
        }
        case "APP/LOGOUT":
            return {...state, userData:null}
        default:return state
    }

}

export const setAppErrorAC = (error:string|null) =>({type:"APP/SET-ERROR",payload:{error}}) as const
export const setAppStatusAC = (status:RequestStatusType) =>({type:"APP/SET-STATUS",payload:{status}}) as const
export const setAppInitializedAC = (value:boolean) =>({type:"APP/SET-IS-APP-INITIALIZED",payload:{value}}) as const
export const setUserDataAC = (userData:UserDataType) => ({type:"APP/SET-USER-DATA",payload:{userData}}) as const
export const logoutAC = () => ({type:"APP/LOGOUT"}) as const

export const initializeApp = ():ThunkCommonType => async dispatch =>{
    try{
        dispatch(setAppStatusAC("loading"))
        let res = await todolistsApi.authMe()
        if (res.resultCode === 0) {
            dispatch(toggleIsLoggedInAC(true))
            dispatch(setUserDataAC(res.data))
        }
        dispatch(setAppInitializedAC(true))
        dispatch(setAppStatusAC("succeeded"))
    } catch (error) {
        handleServerNetworkError(error,dispatch)
    }
}





export type AppActionsType = SetErrorActionType  | SetStatusActionType | ReturnType<typeof setAppInitializedAC> | toggleIsLeggedInActionType| ReturnType<typeof setUserDataAC> | LogoutActionType;

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>
export type LogoutActionType =  ReturnType<typeof logoutAC>
export type InitialStateType = {
    status: RequestStatusType,
    error:string | null,
    isAppInitialized:boolean,
    userData:UserDataType | null
}
export type RequestStatusType = "idle" | "loading"| "succeeded"| "failed"