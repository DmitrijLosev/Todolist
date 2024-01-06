import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
}

export const EditableSpan=React.memo( function(props: EditableSpanPropsType) {
    console.log("editablespan")
    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")
const [error,setError]= useState("")
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setInputValue(e.currentTarget.value)
    }
    const onBlurInputHandler = () => {
        if (inputValue.trim()){
            props.callback(inputValue)
            setInputValue("")
            setEditMode(false)}
        else {
            setError("Input is required")
        }

    }
    const spanOnDoubleClickHandler = () => {
        setEditMode(true)
        setInputValue(props.title)
    }

    return editMode ? <TextField
            value={inputValue} onChange={onChangeInputHandler} onBlur={onBlurInputHandler} autoFocus
            id="outlined-basic" variant="outlined" error={!!error} helperText={error}
        />
        :
        <span onDoubleClick={spanOnDoubleClickHandler}>{props.title}</span>
}
)
