import {ChangeEvent, useState} from "react";
import {RequestStatusType} from "../../../state/app-reducer";

export const useEditableSpan = (callback: (newTitle: string) => void,
                                title: string,entityStatus?:RequestStatusType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")
    const [error,setError]= useState("")
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setInputValue(e.currentTarget.value)
    }
    const onBlurInputHandler = () => {
        if (inputValue.trim()){
            callback(inputValue)
            setInputValue("")
            setEditMode(false)}
        else {
            setError("Input is required")
        }

    }
    const spanOnDoubleClickHandler = () => {
        if (entityStatus !== "loading"){
            setEditMode(true)
            setInputValue(title)
        }
    }

    return {editMode,
        inputValue,
        onChangeInputHandler,
        error,
        spanOnDoubleClickHandler,
        onBlurInputHandler
    }
}