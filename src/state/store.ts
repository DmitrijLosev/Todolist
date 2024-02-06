import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodoActionsType, todolistReducer} from "./todolist-reducer";
import {TaskActionsType, tasksReducer} from "./tasks-reducer";
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";




const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer,
    app:appReducer
})

export const store=legacy_createStore(rootReducer,undefined,applyMiddleware(thunk))

// @ts-ignore
window.store=store;

export type RootStateType=ReturnType<typeof rootReducer>
export type ActionsType=TodoActionsType | TaskActionsType
export type ThunkCommonType= ThunkAction<void, RootStateType, unknown, ActionsType>
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, ActionsType>