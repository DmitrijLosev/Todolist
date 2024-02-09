import React from "react";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {TodoList} from "../TodoList";
import {useTodolistsList} from "./useTodolistsList";
import {Navigate} from "react-router-dom";


export const TodolistsList: React.FC<{ demo: boolean }> = React.memo(({demo}) => {

        const {addTodo, todolistsState,isLoggedIn} = useTodolistsList(demo)

    if(!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

        return (<>
                <Grid container sx={{"padding": "20px"}}>
                    <AddItemForm addItem={addTodo} itemTitle="New Todolist Title"/>
                </Grid>
                <Grid container spacing={3}>
                    {todolistsState.map(tl => {
                        return <Grid item key={tl.id}>
                            <Paper elevation={3} sx={{"padding": "10px", "backgroundColor": "aliceblue"}}>
                                <TodoList todolist={tl}/>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </>
        );
    }
)