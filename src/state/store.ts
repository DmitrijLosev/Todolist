import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodoActionsType, todolistReducer} from "./todolist-reducer";
import {TaskActionsType, tasksReducer} from "./tasks-reducer";
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {LoginActionsType, loginReducer} from "./login-reducer";




const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer,
    app:appReducer,
    login:loginReducer
})

export const store=legacy_createStore(rootReducer,undefined,applyMiddleware(thunk))

// @ts-ignore
window.store=store;

export type RootStateType=ReturnType<typeof rootReducer>
export type ActionsType=TodoActionsType | TaskActionsType | AppActionsType | LoginActionsType
export type ThunkCommonType= ThunkAction<void, RootStateType, unknown, ActionsType>
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, ActionsType>