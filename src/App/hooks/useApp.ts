import {useDispatch} from "react-redux";
import {useCallback, useEffect} from "react";
import {v1} from "uuid";
import {addTodoAC, fetchTodolistsThunk} from "../../state/todolist-reducer";

export const useApp  = () => {
    const dispatch=useDispatch()

    useEffect(()=>{fetchTodolistsThunk(dispatch)},[])

    const addTodo = useCallback(function(newTodoTitle: string) {
        const newTodolistId = v1()
        dispatch(addTodoAC(newTodoTitle,newTodolistId))
    },[dispatch])
    return {addTodo}
}