import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FiltrationButton} from "./FiltrationButton";
import {TaskType} from "./App";
import "./App.css"
/*import {Task} from "./Task";*/


export type FilterType = "All" | "Active" | "Completed"

export type TodoListPropsType = {
    title: string,
    tasks: TaskType[],
    deleteTask: (id: string) => void,
    changeFilter: (filtration: FilterType) => void,
    addTask: (newTaskTitle: string) => void,
    changeStatus: (idIsDone: string, isDone: boolean) => void
    filterValue:FilterType
}
export const TodoList: React.FC<TodoListPropsType> = (props) => {
    const {title, tasks, deleteTask, changeFilter, addTask, changeStatus, filterValue} = props;

    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTaskTitle(e.currentTarget.value)
        }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle.trim());
            setNewTaskTitle("")
        } else {
            setError("Field is required")
        }
    }


    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeInputHandler} onKeyPress={onKeyPressInputHandler}
                       className={error ? "error" : ""}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasks.map((t) => {
                    const onClickDeleteButtonHandler = () => {
                        deleteTask(t.id)
                    }
                    const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeStatus(t.id, e.currentTarget.checked)
                    }
                    return <li key={t.id} className={t.isDone ? "done" : ""}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={onChangeCheckBoxHandler}/><span>{t.title}</span>
                        <button onClick={onClickDeleteButtonHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <FiltrationButton title={"All"} changeFilter={changeFilter} filterValue={filterValue}/>
                <FiltrationButton title={"Active"} changeFilter={changeFilter} filterValue={filterValue}/>
                <FiltrationButton title={"Completed"} changeFilter={changeFilter} filterValue={filterValue}/>
            </div>
        </div>

    );
};

