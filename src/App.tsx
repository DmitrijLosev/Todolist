import React from "react";
import "./App.css";
import {FilterType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTodoAC} from "./state/todolist-reducer";
import {addEmptyTaskListAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {ActionsType, RootStateType} from "./state/store";

export type TaskType = { id: string, title: string, isDone: boolean }
export type TodolistType = { id: string, title: string, filter: FilterType }
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const dispatch=useDispatch<Dispatch<ActionsType>>()

    const todolistsState=useSelector<RootStateType,TodolistType[]>(state => state.todolists)


    function addTodo(newTodoTitle: string) {
        const newTodolistId = v1()
        dispatch(addTodoAC(newTodoTitle,newTodolistId))
        dispatch(addEmptyTaskListAC(newTodolistId))
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
                    {todolistsState.map(tl => {
                        return <Grid item>
                            <Paper elevation={3} sx={{"padding": "10px", "backgroundColor": "aliceblue"}}>
                                <TodoList key={tl.id} id={tl.id} title={tl.title}
                                          filterValue={tl.filter}
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
