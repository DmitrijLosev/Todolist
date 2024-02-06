import {
    changeTaskPropertyTC,
    deleteTaskTC,
    TaskType
} from "../../../../state/tasks-reducer";
import {ChangeEvent} from "react";
import {TaskStatuses} from "../../../../api/todolists-api";
import {useAppDispatch} from "../../../../state/hooks";


export const useTask = (task: TaskType, todoId: string) => {
    const dispatch = useAppDispatch()
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