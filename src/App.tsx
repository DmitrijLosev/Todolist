import React, {useState} from "react";
import "./App.css";
import {FilterType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = { id: string, title: string, isDone: boolean }


function App() {

    const todoListTitle_1: string = "What to learn?"
    const todoListTitle_2: string = "What to buy?"
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterType>("All")

    /*const task_2:TaskType[] = [
        {id: 1, title: "Beer", isDone: true},
        {id: 2, title: "Dry fish", isDone: true},
        {id: 3, title: "Chips", isDone: true}
    ]*/
    const addTask = (newTaskTitle: string) => {
        const newTask = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const changeFilter = (filtration: FilterType) => {
        setFilter(filtration)
    }

    function changeStatus(idIsDone: string, isRealDone: boolean) {
        let task = tasks.find(t => t.id === idIsDone)
        if (task) {task.isDone=isRealDone}
        setTasks([...tasks])
        /*const changedTasks=tasks.map(t => t.id === idIsDone ? { ...t, isDone: isRealDone } : t)
        setTask(changedTasks);*/
    }

    let filteredTasks = tasks;
    if (filter === "Active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "Completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    }


    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={filteredTasks} deleteTask={deleteTask}
                      changeFilter={changeFilter} addTask={addTask} changeStatus={changeStatus} filterValue={filter}/>
            {/* <TodoList title={todoListTitle_2} task={task_2}/>*/}
        </div>
    );
}

export default App;
