import {ResponseType} from "../api/todolists-api";
import {setAppError, setAppStatus} from "../state/app-reducer";
import {Dispatch} from "react";
import {Action} from "redux";

export const handleAppError = <D>(res:ResponseType<D>,dispatch:Dispatch<Action>) =>{
    if (res.messages.length){
        dispatch(setAppError({error:res.messages[0]}))
    } else {
        dispatch(setAppError({error:"Some error occurred"}))
    }
    dispatch(setAppStatus({status:"failed"}))
}

export const handleServerNetworkError = (error:unknown,dispatch:Dispatch<Action>)=>{
    if (error instanceof Error) {
        dispatch(setAppError({error:error.message}))
    } else {
        dispatch(setAppError({error:"Some error occurred"}))
    }
    dispatch(setAppStatus({status:"failed"}))
}