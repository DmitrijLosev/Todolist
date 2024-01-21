import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {ActionsType} from "../../state/store";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, TaskType} from "../../state/tasks-reducer";
import {ChangeEvent} from "react";
import {TaskStatuses} from "../../api/todolists-api";


export const useTask = (task: TaskType, todoId: string) => {
    const dispatch = useDispatch<Dispatch<ActionsType>>()
    const onClickDeleteButtonHandler = () => {
        dispatch(deleteTaskAC(todoId, task.id))
    }
    const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, todoId))
    }
    const callBackChangeTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleAC(todoId, task.id, newTitle))
    }
    return {
        onChangeCheckBoxHandler,
        callBackChangeTaskTitle,
        onClickDeleteButtonHandler
    }
}