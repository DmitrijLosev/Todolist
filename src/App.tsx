import React, {useState} from "react";
import "./App.css";
import {FilterType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type TaskType = { id: string, title: string, isDone: boolean }
export type TodolistType = { id: string, title: string, filter: FilterType }
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistsId1 = v1();
    const todolistsId2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistsId1, title: "What to learn", filter: "all"},
        {id: todolistsId2, title: "What to buy", filter: "all"}
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

    const addTask = (newTaskTitle: string, todoId: string | null) => {
        if (todoId) {
            setTasks({...tasks, [todoId]: [{id: v1(), title: newTaskTitle, isDone: false}, ...tasks[todoId]]})
        }
    }

    const deleteTask = (id: string, todoId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(t => t.id !== id)})
    }

    const changeFilter = (filtration: FilterType, todolistId: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: filtration} : t))
    }

    function changeStatus(idIsDone: string, isRealDone: boolean, todoId: string) {
        setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === idIsDone ? {...t, isDone: isRealDone} : t)})
    }

    function addTodo(newTodoTitle: string) {
        const newTodolistId = v1()
        setTodolists([{id: newTodolistId, title: newTodoTitle, filter: "all"}, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const deleteTodo = (id: string) => {
        setTodolists(todolists.filter(t => t.id !== id))
        delete tasks[id]
    }

    const changeTaskTitle = (todoId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    const changeTodoTitle = (todoId: string, newTitle: string) => {
        setTodolists(todolists.map(t => t.id === todoId ? {...t, title: newTitle} : t))
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{"padding": "20px"}}>
                    <AddItemForm addItem={addTodo} itemTitle="New Todolist Title"/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let filteredTasks = tasks[tl.id];
                        if (tl.filter === "active") {
                            filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                        }
                        if (tl.filter === "completed") {
                            filteredTasks = tasks[tl.id].filter(t => t.isDone)
                        }

                        return <Grid item>
                            <Paper elevation={3} sx={{"padding": "10px", "backgroundColor": "aliceblue"}}>
                                <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={filteredTasks}
                                          deleteTask={deleteTask}
                                          changeFilter={changeFilter} addTask={addTask} changeStatus={changeStatus}
                                          filterValue={tl.filter} deleteTodo={deleteTodo}
                                          changeTodoTitle={changeTodoTitle}
                                          changeTaskTitle={changeTaskTitle}
                                />
                            </Paper>
                        </Grid>
                    })}

                </Grid>
            </Container>
        </div>
    );
}

export default App;
