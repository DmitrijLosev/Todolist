import {useDispatch, useSelector} from "react-redux";
import {ActionsType, RootStateType} from "../../../state/store";
import {
    changeTodoFilterAC, ChangeTodolistTitleTC,
    deleteTodolistTC,
    FilterType
} from "../../../state/todolist-reducer";
import {useCallback, useEffect} from "react";
import {addTaskTC, fetchTasksTC, TaskType} from "../../../state/tasks-reducer";
import {TaskStatuses} from "../../../api/todolists-api";
import {ThunkDispatch} from "redux-thunk";


export const useTodoList = (id:string,
                            filterValue:FilterType) => {
    const taskState = useSelector<RootStateType, TaskType[]>(state => state.tasks[id])

    const dispatch = useDispatch<ThunkDispatch<RootStateType,unknown,ActionsType>>()
useEffect(()=>{
    dispatch(fetchTasksTC(id))
},[])

    let filteredTasks = taskState;
    if (filterValue === "active") {
        filteredTasks = taskState.filter(t =>t.status === TaskStatuses.New || t.status === TaskStatuses.InProgress)
    }
    if (filterValue === "completed") {
        filteredTasks = taskState.filter(t => t.status === TaskStatuses.Completed || t.status === TaskStatuses.Draft)
    }

    const removeTodo = () => {
        dispatch(deleteTodolistTC(id))
    }
    const addTaskForForm = useCallback((title: string) => {
        dispatch(addTaskTC(title, id))
    }, [dispatch, id])
    const callBackChangeTodoTitle = useCallback((newTitle: string) => {
        dispatch(ChangeTodolistTitleTC(id, newTitle))
    }, [dispatch, id])


    const onClickAllFilterButtonHandler = useCallback(() => dispatch(changeTodoFilterAC(id, "all")),[dispatch,id]);
    const onClickActiveFilterButtonHandler =useCallback( () => dispatch(changeTodoFilterAC(id, "active")),[dispatch,id]);
    const onClickCompletedFilterButtonHandler =useCallback( () => dispatch(changeTodoFilterAC(id, "completed")),[dispatch,id]);

    return  {
        callBackChangeTodoTitle,
        removeTodo,
        addTaskForForm,
        filteredTasks,
        onClickAllFilterButtonHandler,
        onClickActiveFilterButtonHandler,
        onClickCompletedFilterButtonHandler
    }
}