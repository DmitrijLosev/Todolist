import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {addTodolistTC, fetchTodolistsTC, TodolistAppType} from "../../state/todolist-reducer";
import {ActionsType, RootStateType} from "../../state/store";
import {ThunkDispatch} from "redux-thunk";
import {RequestStatusType} from "../../state/app-reducer";



export const useApp = (demo:boolean) => {
    const dispatch = useDispatch<ThunkDispatch<RootStateType, unknown, ActionsType>>()
    const todolistsState = useSelector<RootStateType, TodolistAppType[]>(state => state.todolists)
    const status = useSelector<RootStateType,RequestStatusType>(state => state.app.status)
    useEffect(() => {
        if(!demo) {
            dispatch(fetchTodolistsTC())
        }
    }, [demo, dispatch])


    const addTodo = useCallback(function (newTodoTitle: string) {
        dispatch(addTodolistTC(newTodoTitle))
    }, [dispatch])

    return {addTodo, status, todolistsState}

}