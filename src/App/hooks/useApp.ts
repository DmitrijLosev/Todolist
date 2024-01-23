import {useDispatch} from "react-redux";
import {useCallback, useEffect} from "react";
import { addTodolistTC, fetchTodolistsTC} from "../../state/todolist-reducer";
import {ActionsType, RootStateType} from "../../state/store";
import {ThunkDispatch} from "redux-thunk";



export const useApp = () => {
    const dispatch = useDispatch<ThunkDispatch<RootStateType, unknown, ActionsType>>()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const addTodo = useCallback(function (newTodoTitle: string) {
        dispatch(addTodolistTC(newTodoTitle))
    }, [dispatch])
    return {addTodo}
}