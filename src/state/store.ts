import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodoActionsType, todolistReducer} from "./todolist-reducer";
import {TaskActionsType, tasksReducer} from "./tasks-reducer";
import {thunk} from "redux-thunk";




const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer,
})

export const store=legacy_createStore(rootReducer,undefined,applyMiddleware(thunk))

// @ts-ignore
window.store=store;

export type RootStateType=ReturnType<typeof rootReducer>
export type ActionsType=TodoActionsType | TaskActionsType
