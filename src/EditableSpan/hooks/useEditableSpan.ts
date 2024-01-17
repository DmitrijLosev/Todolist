import {ChangeEvent, useState} from "react";

export const useEditableSpan = (callback: (newTitle: string) => void,
                                title: string) => {

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
        setEditMode(true)
        setInputValue(title)
    }

    return {editMode,
        inputValue,
        onChangeInputHandler,
        error,
        spanOnDoubleClickHandler,
        onBlurInputHandler
    }
}