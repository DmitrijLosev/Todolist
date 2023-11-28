import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")
const [error,setError]= useState(false)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setInputValue(e.currentTarget.value)
    }
    const onBlurInputHandler = () => {
        if (inputValue.trim()){
            props.callback(inputValue)
            setInputValue("")
            setEditMode(false)}
        else {
            setError(true)
        }

    }
    const spanOnDoubleClickHandler = () => {
        setEditMode(true)
        setInputValue(props.title)
    }

    return editMode ? <> <input value={inputValue} onChange={onChangeInputHandler} onBlur={onBlurInputHandler} autoFocus/>
        {error && <span style={{"color":"red"}}>input is required</span>} </> :
        <span onDoubleClick={spanOnDoubleClickHandler}>{props.title}</span>
}
