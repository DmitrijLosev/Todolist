import {logout, setAppStatus,setUserData} from "./app-reducer";
import {ThunkCommonType} from "./store";
import {LoginType, todolistsApi} from "../api/todolists-api";
import {handleAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name:"login",
    initialState:initialState,
    reducers:{
        toggleIsLoggedIn:(state, action:PayloadAction<{value:boolean}>)=>{
            state.isLoggedIn = action.payload.value;
        }
    }

})

export const loginReducer = slice.reducer;
export const {toggleIsLoggedIn} = slice.actions;


/*(state:InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/TOGGLE-IS-LOGGED-IN":
            return {...state, isLoggedIn:action.payload.value}
        default:
            return state
    }

}*/

/*export const toggleIsLoggedInAC = (value:boolean) => ({type: "LOGIN/TOGGLE-IS-LOGGED-IN",payload:{value}}) as const*/

export const loginTC = (login: LoginType): ThunkCommonType => async dispatch => {
    try {
        dispatch(setAppStatus({status:"loading"}))
        let res = await todolistsApi.login(login)
        if (res.resultCode === 0) {
            dispatch(toggleIsLoggedIn({value:true}))
            let response = await todolistsApi.authMe()
            dispatch(setUserData({userData:response.data}))
            dispatch(setAppStatus({status:"succeeded"}))
        } else {
            handleAppError(res, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const logoutTC = (): ThunkCommonType => async dispatch => {
    try {
        dispatch(setAppStatus({status:"loading"}))
        let res = await todolistsApi.logout()
        if (res.resultCode === 0) {
            dispatch(toggleIsLoggedIn({value:false}))
            dispatch(logout())
            dispatch(setAppStatus({status:"succeeded"}))
        } else {
            handleAppError(res, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}


