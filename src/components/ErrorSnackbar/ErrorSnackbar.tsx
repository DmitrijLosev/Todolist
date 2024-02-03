import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../state/store";
import {setAppErrorAC} from "../../state/app-reducer";

export function ErrorSnackbar() {
    const error = useSelector<RootStateType, null | string>(state => state.app.error)
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (
        <div>
            <Snackbar open={error !== null} autoHideDuration={5000} onClose={handleClose}
                      anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{width: "100%"}}
                >
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}