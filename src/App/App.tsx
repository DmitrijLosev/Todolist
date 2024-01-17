import React from "react";
import "../App.css";
import {FilterType, TodoList} from "../TodoList/TodoList";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {RootStateType} from "../state/store";
import {useApp} from "./hooks/useApp";


export type TaskType = { id: string, title: string, isDone: boolean }
export type TodolistType = { id: string, title: string, filter: FilterType }
export type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {

    const todolistsState = useSelector<RootStateType, TodolistType[]>(state => state.todolists)

    const {addTodo} = useApp()

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
                        return <Grid item key={tl.id}>
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

