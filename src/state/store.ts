import {combineReducers, createStore} from "redux";
import {TodoActionsType, todolistReducer} from "./todolist-reducer";
import {TaskActionsType, tasksReducer} from "./tasks-reducer";



const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer,
})
export const store=createStore(rootReducer)

// @ts-ignore
window.store=store;

export type RootStateType=ReturnType<typeof rootReducer>
export type ActionsType=TodoActionsType | TaskActionsType