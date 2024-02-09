import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {useCallback, useEffect} from "react";
import {initializeApp} from "../../state/app-reducer";
import {logoutTC} from "../../state/login-reducer";


export const useApp = () => {

    const {status, isAppInitialized, userData} = useAppSelector(state => state.app)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    const logoutHandler = useCallback(() =>{
        dispatch(logoutTC())
    },[dispatch])

    return {status, isAppInitialized, userData, isLoggedIn, logoutHandler}

}