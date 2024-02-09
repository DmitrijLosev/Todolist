import {useAppDispatch, useAppSelector} from "../../../state/hooks";
import {useCallback, useEffect,} from "react";
import {addTodolistTC, fetchTodolistsTC} from "../../../state/todolist-reducer";

export const useTodolistsList = (demo: boolean) => {

    const dispatch = useAppDispatch()
    const todolistsState = useAppSelector(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTodolistsTC())
        }
    }, [demo, dispatch])

    const addTodo = useCallback(function (newTodoTitle: string) {
        dispatch(addTodolistTC(newTodoTitle))
    }, [dispatch])

    return {addTodo, todolistsState, isLoggedIn}

}