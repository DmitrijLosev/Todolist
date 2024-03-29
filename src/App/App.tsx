import React from "react";
import "../App.css";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {useApp} from "./hooks/useApp";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TodolistsList} from "../features/TodoList/TodolistsList/TodolistsList";
import {Login} from "../features/Login/Login";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu } from '@mui/icons-material';

type AppPropsType = { demo?: true }
export const App: React.FC<AppPropsType> = ({demo = false}) => {

    const {status, isAppInitialized, userData, isLoggedIn, logoutHandler} = useApp()

    if (!isAppInitialized) {
        return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
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
                        {userData &&
                            <Typography variant="h6" component="div"
                                        sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
                                <span style={{"fontSize": "14px"}}> <b>login :</b> {userData.login}</span>
                                <span style={{"fontSize": "14px"}}> <b>e-mail :</b> {userData.email}</span>
                            </Typography>}
                        {isLoggedIn &&
                            <Button color="inherit" sx={{"position": "relative"}}
                                    onClick={logoutHandler}>
                                Logout
                            </Button>}
                    </Toolbar>
                    {status === "loading" && <Box sx={{
                        "position": "absolute",
                        "display": "inline-block",
                        "width": "100%",
                        "top": "56px"
                    }}>
                        <LinearProgress sx={{"height": "8px"}}/>
                    </Box>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={"/*"} element={<TodolistsList demo={demo}/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>

                </Container>
            </div>
        </BrowserRouter>

    );
}


