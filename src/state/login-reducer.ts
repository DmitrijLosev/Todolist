import {logoutAC, setAppStatusAC, SetErrorActionType, SetStatusActionType, setUserDataAC} from "./app-reducer";
import {ThunkCommonType} from "./store";
import {LoginType, todolistsApi} from "../api/todolists-api";
import {handleAppError, handleServerNetworkError} from "../utils/error-utils";


const initialState: InitialStateType = {
    isLoggedIn: false
}

export const loginReducer = (state:InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/TOGGLE-IS-LOGGED-IN":
            return {...state, isLoggedIn:action.payload.value}
        default:
            return state
    }

}

export const toggleIsLoggedInAC = (value:boolean) => ({type: "LOGIN/TOGGLE-IS-LOGGED-IN",payload:{value}}) as const

export const loginTC = (login: LoginType): ThunkCommonType => async dispatch => {
    try {
        dispatch(setAppStatusAC("loading"))
        let res = await todolistsApi.login(login)
        if (res.resultCode === 0) {
            dispatch(toggleIsLoggedInAC(true))
            let response = await todolistsApi.authMe()
            dispatch(setUserDataAC(response.data))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleAppError(res, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const logoutTC = (): ThunkCommonType => async dispatch => {
    try {
        dispatch(setAppStatusAC("loading"))
        let res = await todolistsApi.logout()
        if (res.resultCode === 0) {
            dispatch(toggleIsLoggedInAC(false))
            dispatch(logoutAC())
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleAppError(res, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export type  toggleIsLeggedInActionType= ReturnType<typeof toggleIsLoggedInAC>
export type LoginActionsType = SetErrorActionType | SetStatusActionType | toggleIsLeggedInActionType;
export type InitialStateType = { isLoggedIn:boolean }
