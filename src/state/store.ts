import {Action, combineReducers} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {thunk, ThunkAction} from "redux-thunk";
import { appReducer} from "./app-reducer";
import { loginReducer} from "./login-reducer";
import { configureStore} from "@reduxjs/toolkit";




const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer,
    app:appReducer,
    login:loginReducer
})

//export const store=legacy_createStore(rootReducer,undefined,applyMiddleware(thunk))
export const store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(
                // correctly typed middlewares can just be used
                thunk,
                // you can also type middlewares manually
               // untypedMiddleware as Middleware<
                   // (action: Action<'specialAction'>) => number,
                 //   RootState
               // >,
            )
            // prepend and concat calls can be chained
            //.concat(logger),
})

// @ts-ignore
window.store=store;

export type RootStateType=ReturnType<typeof rootReducer>
export type ThunkCommonType= ThunkAction<void, RootStateType, unknown, Action>
/*export type AppDispatchType = ThunkDispatch<RootStateType, unknown, Actions>*/
export type AppDispatchType = typeof store.dispatch