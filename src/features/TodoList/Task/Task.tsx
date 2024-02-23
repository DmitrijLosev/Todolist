import React from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import UnpublishedRoundedIcon from "@mui/icons-material/UnpublishedRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useTask} from "./hooks/useTask";
import {TaskDomainType} from "../../../state/tasks-reducer";
import {TaskStatuses} from "../../../api/todolists-api";

type TaskPropsType = {
    task: TaskDomainType
    todoId: string
}
export const Task: React.FC<TaskPropsType> = React.memo(({task, todoId}) => {

        const {
            onChangeCheckBoxHandler,
            callBackChangeTaskTitle,
            onClickDeleteButtonHandler
        } = useTask(task, todoId)

        return (
            <li>
                <Checkbox
                    checked={task.status === TaskStatuses.Completed  || task.status === TaskStatuses.Draft }
                    onChange={onChangeCheckBoxHandler}
                    icon={< UnpublishedRoundedIcon/>}
                    checkedIcon={< TaskAltRoundedIcon/>}
                    disabled = {task.entityTaskStatus === "loading"}
                />
                <EditableSpan title={task.title}
                              callback={callBackChangeTaskTitle}
                entityStatus={task.entityTaskStatus}/>
                <IconButton onClick={onClickDeleteButtonHandler} size="small" disabled = {task.entityTaskStatus === "loading"}
                ><Delete/>
                </IconButton>
            </li>
        );
    }
)

