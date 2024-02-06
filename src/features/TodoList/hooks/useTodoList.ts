import {
    changeTodoFilterAC, changeTodolistTitleTC,
    deleteTodolistTC,
    TodolistAppType
} from "../../../state/todolist-reducer";
import {useCallback} from "react";
import {addTaskTC} from "../../../state/tasks-reducer";
import {TaskStatuses} from "../../../api/todolists-api";
import {useAppDispatch, useAppSelector} from "../../../state/hooks";


export const useTodoList = (todolist:TodolistAppType) => {
    const taskState = useAppSelector(state =>
        state.tasks[todolist.id])
    const dispatch = useAppDispatch()


    let filteredTasks = taskState;
    if (todolist.filter === "active") {
        filteredTasks = taskState.filter(t =>t.status === TaskStatuses.New || t.status === TaskStatuses.InProgress)
    }
    if (todolist.filter === "completed") {
        filteredTasks = taskState.filter(t => t.status === TaskStatuses.Completed || t.status === TaskStatuses.Draft)
    }

    const removeTodo = () => {
        dispatch(deleteTodolistTC(todolist.id))
    }
    const addTaskForForm = useCallback((title: string) => {
        dispatch(addTaskTC(title, todolist.id))
    }, [dispatch, todolist.id])
    const callBackChangeTodoTitle = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolist.id, newTitle))
    }, [dispatch, todolist.id])


    const onClickAllFilterButtonHandler = useCallback(() => dispatch(changeTodoFilterAC(todolist.id, "all")),[dispatch,todolist.id]);
    const onClickActiveFilterButtonHandler =useCallback( () => dispatch(changeTodoFilterAC(todolist.id, "active")),[dispatch,todolist.id]);
    const onClickCompletedFilterButtonHandler =useCallback( () => dispatch(changeTodoFilterAC(todolist.id, "completed")),[dispatch,todolist.id]);

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