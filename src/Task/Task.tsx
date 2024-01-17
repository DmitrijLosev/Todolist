import React from "react";
import {Checkbox, IconButton} from "@mui/material";
import UnpublishedRoundedIcon from "@mui/icons-material/UnpublishedRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../App/App";
import {useTask} from "./hooks/useTask";

type TaskPropsType = {
    task: TaskType
    todoId: string
}
export const Task: React.FC<TaskPropsType> = React.memo(({task, todoId}) => {

        const {
            onChangeCheckBoxHandler,
            callBackChangeTaskTitle,
            onClickDeleteButtonHandler
        } = useTask(task, todoId)

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

