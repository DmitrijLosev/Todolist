import React, {ChangeEvent} from "react";
import {TaskType} from "./App";
import "./App.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import UnpublishedRoundedIcon from '@mui/icons-material/UnpublishedRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import {useDispatch, useSelector} from "react-redux";
import {ActionsType, RootStateType} from "./state/store";
import {Dispatch} from "redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, deleteTodoAllTasksAC} from "./state/tasks-reducer";
import {changeTodoFilterAC, changeTodoTitleAC, deleteTodoAC} from "./state/todolist-reducer";



export type FilterType = "all" | "active" | "completed"

export type TodoListPropsType = {
    id: string,
    title: string,
    filterValue: FilterType
}
export const TodoList: React.FC<TodoListPropsType> = (props) => {
    const {
        id,
        title,
        filterValue,
    } = props;

    const taskState=useSelector<RootStateType,TaskType[]>(state => state.tasks[id])
    const dispatch=useDispatch<Dispatch<ActionsType>>()

    let filteredTasks = taskState;
    if (filterValue === "active") {
        filteredTasks = taskState.filter(t => !t.isDone)
    }
    if (filterValue === "completed") {
        filteredTasks = taskState.filter(t => t.isDone)
    }

    const removeTodo = () => {
        dispatch(deleteTodoAC(id))
        dispatch(deleteTodoAllTasksAC(id))
    }
    const addTaskForForm = (title: string) => {
        dispatch(addTaskAC(title,id))
    }
    const callBackChangeTodoTitle = (newTitle: string) => {
        dispatch(changeTodoTitleAC(id,newTitle))
    }
    const onClickAllFilterButtonHandler = () => dispatch(changeTodoFilterAC(id,"all"))
    const onClickActiveFilterButtonHandler = () => dispatch(changeTodoFilterAC(id,"active"))
    const onClickCompletedFilterButtonHandler = () => dispatch(changeTodoFilterAC(id,"completed"))

    return (
        <div className="todolist">
            <h3><EditableSpan title={title} callback={callBackChangeTodoTitle}/>
                <IconButton onClick={removeTodo} size="large"
                ><Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskForForm} itemTitle={"New Task Title"}/>
            <ul style={{"listStyle":"none", "padding":"0"}}>
                {filteredTasks.map((t) => {
                    const onClickDeleteButtonHandler = () => {
                        dispatch(deleteTaskAC(id,t.id))
                    }
                    const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, id))
                    }
                    const callBackChangeTaskTitle = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(id,t.id,newTitle))
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




