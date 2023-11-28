import React, {useState} from "react";
import "./App.css";
import {FilterType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = { id: string, title: string, isDone: boolean }
export type TodolistType = { id: string, title: string, filter: FilterType }
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const addTask = (newTaskTitle: string, todoId: string | null) => {
        if (todoId) {
            const newTask = {id: v1(), title: newTaskTitle, isDone: false}
            tasks[todoId] = [newTask, ...tasks[todoId]]
            setTasks({...tasks})
        }
    }
    const deleteTask = (id: string, todoId: string) => {
        tasks[todoId] = tasks[todoId].filter(t => t.id !== id)
        setTasks({...tasks})
    }
    const changeFilter = (filtration: FilterType, todolistId: string) => {
        const todolist = todolists.find(t => t.id === todolistId)
        if (todolist) todolist.filter = filtration;
        setTodolists([...todolists])
    }

    function changeStatus(idIsDone: string, isRealDone: boolean, todoId: string) {
        let task = tasks[todoId].find(t => t.id === idIsDone)
        if (task) {
            task.isDone = isRealDone
            setTasks({...tasks})
        }

        /*const changedTasks=tasks.map(t => t.id === idIsDone ? { ...t, isDone: isRealDone } : t)
        setTask(changedTasks);*/
    }

    function addTodo(newTodoTitle: string) {
        const newTodolist: TodolistType = {id: v1(), title: newTodoTitle, filter: "All"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    const deleteTodo = (id: string) => {
        let newTodolists = todolists.filter(t => t.id !== id)
        setTodolists(newTodolists)
        delete tasks[id]
        setTasks({...tasks})
    }

    const changeTaskTitle = (todoId: string, taskId: string, newTitle: string) => {
        const task = tasks[todoId].find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
        }
        setTasks({...tasks})
    }

    const changeTodoTitle = (todoId: string, newTitle: string) => {
        const todolist = todolists.find(t => t.id === todoId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }

    }

    const todolistsId1 = v1();
    const todolistsId2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistsId1, title: "What to learn", filter: "All"},
        {id: todolistsId2, title: "What to buy", filter: "All"}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistsId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}],
        [todolistsId2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Dry fish", isDone: false},
            {id: v1(), title: "Chips", isDone: true}
        ]
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodo}/>
            {todolists.map(tl => {
                let filteredTasks = tasks[tl.id];
                if (tl.filter === "Active") {
                    filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === "Completed") {
                    filteredTasks = tasks[tl.id].filter(t => t.isDone)
                }

                return <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={filteredTasks} deleteTask={deleteTask}
                                 changeFilter={changeFilter} addTask={addTask} changeStatus={changeStatus}
                                 filterValue={tl.filter} deleteTodo={deleteTodo}
                                 changeTodoTitle={changeTodoTitle}
                                 changeTaskTitle={changeTaskTitle}
                />
            })}

        </div>
    );
}

export default App;
