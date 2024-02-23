import React from "react";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import  ButtonGroup from "@mui/material/ButtonGroup";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {useTodoList} from "./hooks/useTodoList";
import {SuperMUIButton} from "../../components/SuperMUIButton/SuperMUIButton";
import {TodolistAppType} from "../../state/todolist-reducer";


export type TodoListPropsType = {
   todolist:TodolistAppType
}
export const TodoList: React.FC<TodoListPropsType> = React.memo(({todolist}) => {
        const {
            callBackChangeTodoTitle,
            removeTodo,
            addTaskForForm,
            filteredTasks,
            onClickAllFilterButtonHandler,
            onClickActiveFilterButtonHandler,
            onClickCompletedFilterButtonHandler
        } = useTodoList(todolist)


        return (
            <div className="todolist">
                <h3>
                    <EditableSpan
                        title={todolist.title} callback={callBackChangeTodoTitle} entityStatus={todolist.entityStatus}/>
                    <IconButton
                        onClick={removeTodo}
                        size="large"
                        disabled = {todolist.entityStatus==="loading"}
                    >
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm
                    addItem={addTaskForForm}
                    itemTitle={"New Task Title"}
                disable = {todolist.entityStatus==="loading"}/>

                <ul style={{"listStyle": "none", "padding": "0"}}>
                    {filteredTasks.map((t) => {

                        return <Task
                            key={t.id}
                            task={t}
                            todoId={todolist.id}/>
                    })}
                </ul>

                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group">
                    <SuperMUIButton onClick={onClickAllFilterButtonHandler}
                                    variant={todolist.filter === "all" ? "outlined" : "contained"}>
                        All
                    </SuperMUIButton>
                    <SuperMUIButton onClick={onClickActiveFilterButtonHandler}
                                    variant={todolist.filter === "active" ? "outlined" : "contained"}>
                        Active
                    </SuperMUIButton>
                    <SuperMUIButton onClick={onClickCompletedFilterButtonHandler}
                                    variant={todolist.filter === "completed" ? "outlined" : "contained"}>
                        Completed
                    </SuperMUIButton>

                </ButtonGroup>
            </div>

        );
    }
)



