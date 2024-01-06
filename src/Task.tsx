import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@mui/material";
import UnpublishedRoundedIcon from "@mui/icons-material/UnpublishedRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./state/tasks-reducer";
import {TaskType} from "./App";
import {useDispatch} from "react-redux";
import {ActionsType} from "./state/store";
import {Dispatch} from "redux";

type TaskPropsType = {
    task: TaskType
    todoId: string
}
export const Task: React.FC<TaskPropsType> = React.memo(({task, todoId}) => {

        const dispatch = useDispatch<Dispatch<ActionsType>>()
        const onClickDeleteButtonHandler = () => {
            dispatch(deleteTaskAC(todoId, task.id))
        }
        const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todoId))
        }
        const callBackChangeTaskTitle = (newTitle: string) => {
            dispatch(changeTaskTitleAC(todoId, task.id, newTitle))
        }
        return (
            <li className={task.isDone ? "done" : ""}>
                <Checkbox
                    checked={task.isDone}
                    onChange={onChangeCheckBoxHandler}
                    icon={< UnpublishedRoundedIcon/>}
                    checkedIcon={< TaskAltRoundedIcon/>}
                />
                <EditableSpan title={task.title}
                              callback={callBackChangeTaskTitle}/>
                <IconButton onClick={onClickDeleteButtonHandler} size="small"
                ><Delete/>
                </IconButton>
            </li>
        );
    }
)

