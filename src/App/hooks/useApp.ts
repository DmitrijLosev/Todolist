import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {ActionsType} from "../../state/store";
import {useCallback} from "react";
import {v1} from "uuid";
import {addTodoAC} from "../../state/todolist-reducer";

export const useApp  = () => {
    const dispatch=useDispatch<Dispatch<ActionsType>>()
    const addTodo = useCallback(function(newTodoTitle: string) {
        const newTodolistId = v1()
        dispatch(addTodoAC(newTodoTitle,newTodolistId))
    },[dispatch])
    return {addTodo}
}