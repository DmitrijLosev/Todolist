import React, {ChangeEvent} from "react";
import {FiltrationButton} from "./FiltrationButton";
import {TaskType} from "./App";
import "./App.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
/*import {Task} from "./Task";*/


export type FilterType = "All" | "Active" | "Completed"

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

    return (
        <div className="todolist">
            <h3><EditableSpan title={title} callback={callBackChangeTodoTitle}/></h3>
            <button onClick={removeTodo}>x</button>
            <AddItemForm addItem={addTaskForForm}/>
            <ul>
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
                        <input type="checkbox" checked={t.isDone}
                               onChange={onChangeCheckBoxHandler}/>
                        <EditableSpan title={t.title} callback={callBackChangeTaskTitle}/>
                        <button onClick={onClickDeleteButtonHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <FiltrationButton title={"All"} changeFilter={changeFilter} filterValue={filterValue} id={id}/>
                <FiltrationButton title={"Active"} changeFilter={changeFilter} filterValue={filterValue} id={id}/>
                <FiltrationButton title={"Completed"} changeFilter={changeFilter} filterValue={filterValue} id={id}/>
            </div>
        </div>

    );
};




