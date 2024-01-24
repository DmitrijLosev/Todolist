import {useDispatch} from "react-redux";
import {ActionsType, RootStateType} from "../../../../state/store";
import {
    changeTaskPropertyTC,
    deleteTaskTC,
    TaskType
} from "../../../../state/tasks-reducer";
import {ChangeEvent} from "react";
import {TaskStatuses} from "../../../../api/todolists-api";
import {ThunkDispatch} from "redux-thunk";


export const useTask = (task: TaskType, todoId: string) => {
    const dispatch = useDispatch<ThunkDispatch<RootStateType,unknown,ActionsType>>()
    const onClickDeleteButtonHandler = () => {
        dispatch(deleteTaskTC(todoId, task.id))
    }
    const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskPropertyTC(task.id,
            todoId,
            {status:e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }
    const callBackChangeTaskTitle = (newTitle: string) => {
        dispatch(changeTaskPropertyTC(task.id, todoId, {title:newTitle}))
    }
    return {
        onChangeCheckBoxHandler,
        callBackChangeTaskTitle,
        onClickDeleteButtonHandler
    }
}