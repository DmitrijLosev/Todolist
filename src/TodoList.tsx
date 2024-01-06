import React, {useCallback} from "react";
import {TaskType} from "./App";
import "./App.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup,IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {ActionsType, RootStateType} from "./state/store";
import {Dispatch} from "redux";
import {addTaskAC} from "./state/tasks-reducer";
import {changeTodoFilterAC, changeTodoTitleAC, deleteTodoAC} from "./state/todolist-reducer";
import {Task} from "./Task";


export type FilterType = "all" | "active" | "completed"

export type TodoListPropsType = {
    id: string,
    title: string,
    filterValue: FilterType
}
export const TodoList: React.FC<TodoListPropsType> = React.memo(({id, title, filterValue}) => {
        console.log("todolist")
        const taskState = useSelector<RootStateType, TaskType[]>(state => state.tasks[id])
        const dispatch = useDispatch<Dispatch<ActionsType>>()

        let filteredTasks = taskState;
        if (filterValue === "active") {
            filteredTasks = taskState.filter(t => !t.isDone)
        }
        if (filterValue === "completed") {
            filteredTasks = taskState.filter(t => t.isDone)
        }

        const removeTodo = () => {
            dispatch(deleteTodoAC(id))
        }
        const addTaskForForm = useCallback((title: string) => {
            dispatch(addTaskAC(title, id))
        }, [dispatch, id])
        const callBackChangeTodoTitle = useCallback((newTitle: string) => {
            dispatch(changeTodoTitleAC(id, newTitle))
        }, [dispatch, id])


        const onClickAllFilterButtonHandler = useCallback(() => dispatch(changeTodoFilterAC(id, "all")),[dispatch,id]);
        const onClickActiveFilterButtonHandler =useCallback( () => dispatch(changeTodoFilterAC(id, "active")),[dispatch,id]);
        const onClickCompletedFilterButtonHandler =useCallback( () => dispatch(changeTodoFilterAC(id, "completed")),[dispatch,id]);

        return (
            <div className="todolist">
                <h3><EditableSpan title={title} callback={callBackChangeTodoTitle}/>
                    <IconButton onClick={removeTodo} size="large"
                    ><Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskForForm} itemTitle={"New Task Title"}/>
                <ul style={{"listStyle": "none", "padding": "0"}}>
                    {filteredTasks.map((t) => {
                        return <Task key={t.id} task={t} todoId={id}/>
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
    }
)



