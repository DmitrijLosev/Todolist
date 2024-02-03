
const InitialState: InitialStateType = {
   status:"idle",
    error:null
}

export  const appReducer = (state:InitialStateType=InitialState,action:AppActionsType):InitialStateType =>{
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state,status:action.payload.status}
        case "APP/SET-ERROR":
            return {...state,error:action.payload.error}
        default:return state
    }

}

export const setAppErrorAC = (error:string|null) =>({type:"APP/SET-ERROR",payload:{error}}) as const
export const setAppStatusAC = (status:RequestStatusType) =>({type:"APP/SET-STATUS",payload:{status}}) as const

type AppActionsType = SetErrorActionType  | SetStatusActionType;

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>

export type InitialStateType = {
    status: RequestStatusType,
    error:string | null
}
export type RequestStatusType = "idle" | "loading"| "succeeded"| "failed"