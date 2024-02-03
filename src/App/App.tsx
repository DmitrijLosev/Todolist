import React from "react";
import "../App.css";
import {TodoList} from "../features/TodoList/TodoList";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import Box from '@mui/material/Box';
import {Menu} from "@mui/icons-material";
import {useApp} from "./hooks/useApp";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


type AppPropsType = { demo?: true }
export const App: React.FC<AppPropsType> = React.memo(({demo = false}) => {

    const {addTodo, status, todolistsState} = useApp(demo)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton >
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit" sx={{"position": "relative"}}>Login</Button>
                </Toolbar>
                {status === "loading" && <Box sx={{
                    "position": "absolute",
                    "display": "inline-block",
                    "width": "100%",
                    "top": "56px"
                }}>
                    <LinearProgress sx={{"height":"8px"}} />
                </Box>}
            </AppBar>
            <Container fixed>
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
            </Container>
        </div>
    );
}
)


