import {ThunkCommonType} from "./store";
import {todolistsApi, UserDataType} from "../api/todolists-api";
import {toggleIsLoggedIn} from "./login-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
   status:"idle",
    error:null as null | string ,
    isAppInitialized:false,
    userData: null as UserDataType | null
}

const slice = createSlice({
    name:"app",
    initialState:initialState,
    reducers:{
        setAppError(state, action:PayloadAction<{error:string|null}>) {
            state.error = action.payload.error
        },
        setAppStatus(state, action:PayloadAction<{status:RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppInitialized(state, action:PayloadAction<{value:boolean}>) {
            state.isAppInitialized = action.payload.value
        },
        setUserData(state, action:PayloadAction<{userData:UserDataType}>) {
            state.userData = action.payload.userData
        },
        logout(state) {
            state.userData = null
        }

    }

})



export  const appReducer = slice.reducer;
export const {setAppError,setAppStatus, setAppInitialized,setUserData,
    logout
} = slice.actions;

/*(state:InitialStateType=InitialState,action:AppActionsType):InitialStateType =>{
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

}*/

// export const setAppErrorAC = (error:string|null) =>({type:"APP/SET-ERROR",payload:{error}}) as const
/*export const setAppStatusAC = (status:RequestStatusType) =>({type:"APP/SET-STATUS",payload:{status}}) as const*/
// export const setAppInitializedAC = (value:boolean) =>({type:"APP/SET-IS-APP-INITIALIZED",payload:{value}}) as const
/*export const setUserDataAC = (userData:UserDataType) => ({type:"APP/SET-USER-DATA",payload:{userData}}) as const*/
// export const logoutAC = () => ({type:"APP/LOGOUT"}) as const

export const initializeApp = ():ThunkCommonType => async dispatch =>{
    try{
        dispatch(setAppStatus({status:"loading"}))
        let res = await todolistsApi.authMe()
        if (res.resultCode === 0) {
            dispatch(toggleIsLoggedIn({value:true}))
            dispatch(setUserData({userData:res.data}))
        }
        dispatch(setAppInitialized({value:true}))
        dispatch(setAppStatus({status:"succeeded"}))
    } catch (error) {
        handleServerNetworkError(error,dispatch)
    }
}


export type InitialStateType = typeof initialState
export type RequestStatusType = "idle" | "loading"| "succeeded"| "failed"