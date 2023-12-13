import React, {ChangeEvent} from "react";
import {TaskType} from "./App";
import "./App.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import UnpublishedRoundedIcon from '@mui/icons-material/UnpublishedRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
/*import {Task} from "./Task";*/


export type FilterType = "all" | "active" | "completed"

export type TodoListPropsType = {
    id: string,
    title: string,
    tasks: TaskType[],
    deleteTask: (id: string, todoId: string) => void,
    changeFilter: (filtration: FilterType, todolistId: string) => void,
    addTask: (newTaskTitle: string, todoId: string | null) => void,
    changeStatus: (idIsDone: string, isDone: boolean, todoId: string) => void
    filterValue: FilterType
    deleteTodo: (id: string) => void
    changeTaskTitle: (todoId: string, taskId: string, newTitle: string) => void
    changeTodoTitle: (todoId: string, newTitle: string) => void
}
export const TodoList: React.FC<TodoListPropsType> = (props) => {
    const {
        id,
        title,
        tasks,
        deleteTask,
        changeFilter,
        addTask,
        changeStatus,
        filterValue,
        deleteTodo,
        changeTaskTitle,
        changeTodoTitle
    } = props;

    const removeTodo = () => {
        deleteTodo(id)
    }
    const addTaskForForm = (title: string) => {
        addTask(title, id)
    }
    const callBackChangeTodoTitle = (newTitle: string) => {
        changeTodoTitle(id, newTitle)
    }
    const onClickAllFilterButtonHandler = () => changeFilter("all", id);
    const onClickActiveFilterButtonHandler = () => changeFilter("active", id);
    const onClickCompletedFilterButtonHandler = () => changeFilter("completed", id);
    return (
        <div className="todolist">
            <h3><EditableSpan title={title} callback={callBackChangeTodoTitle}/>
                <IconButton onClick={removeTodo} size="large"
                ><Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskForForm} itemTitle={"New Task Title"}/>
            <ul style={{"listStyle":"none", "padding":"0"}}>
                {tasks.map((t) => {
                    const onClickDeleteButtonHandler = () => {
                        deleteTask(t.id, id)
                    }
                    const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeStatus(t.id, e.currentTarget.checked, id)
                    }
                    const callBackChangeTaskTitle = (newTitle: string) => {
                        changeTaskTitle(id, t.id, newTitle)
                    }

                    return <li key={t.id} className={t.isDone ? "done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            onChange={onChangeCheckBoxHandler}
                            icon={< UnpublishedRoundedIcon/>}
                            checkedIcon={< TaskAltRoundedIcon/>}
                        />
                        <EditableSpan title={t.title} callback={callBackChangeTaskTitle}/>
                        <IconButton onClick={onClickDeleteButtonHandler} size="small"
                        ><Delete/>
                        </IconButton>
                    </li>
                })}
            </ul>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={onClickAllFilterButtonHandler}
                        variant={filterValue === "all" ? "outlined" : "contained"}>All</Button>
                <Button onClick={onClickActiveFilterButtonHandler}
                        variant={filterValue === "active" ? "outlined" : "contained"}>Active</Button>
                <Button onClick={onClickCompletedFilterButtonHandler}
                        variant={filterValue === "completed" ? "outlined" : "contained"}>Completed</Button>

            </ButtonGroup>
        </div>

    );
};




