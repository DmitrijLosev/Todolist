import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {ActionsType, RootStateType} from "../../state/store";
import {changeTodoFilterAC, changeTodoTitleAC, deleteTodoAC, FilterType} from "../../state/todolist-reducer";
import {useCallback} from "react";
import {addTaskAC, TaskType} from "../../state/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";


export const useTodoList = (id:string,
                            filterValue:FilterType) => {
    const taskState = useSelector<RootStateType, TaskType[]>(state => state.tasks[id])

    const dispatch = useDispatch<Dispatch<ActionsType>>()


    let filteredTasks = taskState;
    if (filterValue === "active") {
        filteredTasks = taskState.filter(t =>t.status === TaskStatuses.New || t.status === TaskStatuses.InProgress)
    }
    if (filterValue === "completed") {
        filteredTasks = taskState.filter(t => t.status === TaskStatuses.Completed || t.status === TaskStatuses.Draft)
    }

    const removeTodo = () => {
        dispatch(deleteTodoAC(id))
    }

    const addTaskForForm = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch, id])
    const callBackChangeTodoTitle = useCallback((newTitle: string) => {
        dispatch(changeTodoTitleAC(id, newTitle))
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