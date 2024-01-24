import React from "react";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import { ButtonGroup, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {useTodoList} from "./hooks/useTodoList";
import {SuperMUIButton} from "../../components/SuperMUIButton/SuperMUIButton";
import {FilterType} from "../../state/todolist-reducer";




export type TodoListPropsType = {
    id: string,
    title: string,
    filterValue: FilterType
}
export const TodoList: React.FC<TodoListPropsType> = React.memo(({id, title, filterValue}) => {


        const {
            callBackChangeTodoTitle,
            removeTodo,
            addTaskForForm,
            filteredTasks,
            onClickAllFilterButtonHandler,
            onClickActiveFilterButtonHandler,
            onClickCompletedFilterButtonHandler
        } = useTodoList(id, filterValue)


        return (
            <div className="todolist">
                <h3>
                    <EditableSpan
                        title={title} callback={callBackChangeTodoTitle}/>
                    <IconButton
                        onClick={removeTodo}
                        size="large"
                    >
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm
                    addItem={addTaskForForm}
                    itemTitle={"New Task Title"}/>

                <ul style={{"listStyle": "none", "padding": "0"}}>
                    {filteredTasks.map((t) => {

                        return <Task
                            key={t.id}
                            task={t}
                            todoId={id}/>
                    })}
                </ul>

                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group">
                    <SuperMUIButton onClick={onClickAllFilterButtonHandler}
                                    variant={filterValue === "all" ? "outlined" : "contained"}>
                        All
                    </SuperMUIButton>
                    <SuperMUIButton onClick={onClickActiveFilterButtonHandler}
                                    variant={filterValue === "active" ? "outlined" : "contained"}>
                        Active
                    </SuperMUIButton>
                    <SuperMUIButton onClick={onClickCompletedFilterButtonHandler}
                                    variant={filterValue === "completed" ? "outlined" : "contained"}>
                        Completed
                    </SuperMUIButton>

                </ButtonGroup>
            </div>

        );
    }
)



