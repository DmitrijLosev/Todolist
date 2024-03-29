import React from "react"
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {loginTC} from "../../state/login-reducer";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import { Navigate } from "react-router-dom";

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state=>state.login.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
        validate: (values) => {
            let errors= {};
            if (!values.email) {
                errors =  {...errors, email:"E-mail is required"}
            }
            if (!values.password) {
                errors =  {...errors, password:"Password is required"}
            }
            return errors
        }
    });

    if (isLoggedIn) {
        return <Navigate to={"/"}/>}

    return <Grid container justifyContent={"center"}>
        <Grid item justifyContent={"center"}>
            <form onSubmit={formik.handleSubmit} >
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={"https://social-network.samuraijs.com/"}
                               target={"_blank"}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: dmitrijslosevs@inbox.lv</p>
                        <p>Password: createreactapp</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" {...formik.getFieldProps("email")}  autoComplete = "off" InputLabelProps={{ shrink: true }}/>
                        {formik.errors.email && formik.touched.email &&
                            <div style = {{color: "red", fontSize: "12px"}}>{formik.errors.email}</div>}
                        <TextField type="password" label="Password" InputLabelProps={{ shrink: true }}
                                   margin="normal" {...formik.getFieldProps("password")}
                                   autoComplete = "off"/>
                        {formik.errors.password && formik.touched.password &&
                            <div style = {{color: "red", fontSize: "12px"}}>{formik.errors.password}</div>}
                        <FormControlLabel label={"Remember me"}
                                          control={<Checkbox  {...formik.getFieldProps("rememberMe")}
                                                              checked={formik.values.rememberMe}/>}
                        />
                        <Button type={"submit"} variant={"contained"} color={"primary"}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}