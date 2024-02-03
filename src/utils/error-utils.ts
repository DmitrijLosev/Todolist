import {ResponseType} from "../api/todolists-api";
import {setAppErrorAC, setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../state/app-reducer";
import {Dispatch} from "react";

export const handleAppError = <D>(res:ResponseType<D>,dispatch:Dispatch< SetErrorActionType | SetStatusActionType>) =>{
    if (res.messages.length){
        dispatch(setAppErrorAC(res.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occurred"))
    }
    dispatch(setAppStatusAC("failed"))
}

export const handleServerNetworkError = (error:unknown,dispatch:Dispatch< SetErrorActionType | SetStatusActionType>)=>{
    if (error instanceof Error) {
        dispatch(setAppErrorAC(error.message))
    } else {
        dispatch(setAppErrorAC("Some error occurred"))
    }
    dispatch(setAppStatusAC("failed"))
}