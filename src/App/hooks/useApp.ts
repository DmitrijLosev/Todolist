import {useCallback, useEffect} from "react";
import {addTodolistTC, fetchTodolistsTC} from "../../state/todolist-reducer";
import {useAppDispatch, useAppSelector} from "../../state/hooks";



export const useApp = (demo:boolean) => {
    const dispatch = useAppDispatch()
    const todolistsState = useAppSelector(state=>state.todolists)
    const status = useAppSelector(state => state.app.status)
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