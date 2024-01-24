import React from "react";
import {Checkbox, IconButton} from "@mui/material";
import UnpublishedRoundedIcon from "@mui/icons-material/UnpublishedRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useTask} from "./hooks/useTask";
import {TaskType} from "../../../state/tasks-reducer";
import {TaskStatuses} from "../../../api/todolists-api";

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
            <li style={task.status === TaskStatuses.Completed || task.status === TaskStatuses.Draft ? {"opacity":"0.5"} : {}}>
                <Checkbox
                    checked={task.status === TaskStatuses.Completed  || task.status === TaskStatuses.Draft }
                    onChange={onChangeCheckBoxHandler}
                    icon={< UnpublishedRoundedIcon/>}
                    checkedIcon={< TaskAltRoundedIcon/>}
                />
                <EditableSpan title={task.title}
                              callback={callBackChangeTaskTitle} />
                <IconButton onClick={onClickDeleteButtonHandler} size="small"
                ><Delete/>
                </IconButton>
            </li>
        );
    }
)

