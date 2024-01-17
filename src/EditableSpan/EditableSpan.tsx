import React from "react";
import {TextField} from "@mui/material";
import {useEditableSpan} from "./hooks/useEditableSpan";


type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

        const {
            editMode,
            inputValue,
            onChangeInputHandler,
            error,
            spanOnDoubleClickHandler,
            onBlurInputHandler
        } = useEditableSpan(props.callback, props.title)

        return editMode ? <TextField
                value={inputValue} onChange={onChangeInputHandler} onBlur={onBlurInputHandler} autoFocus
                id="outlined-basic" variant="outlined" error={!!error} helperText={error}
            />
            :
            <span onDoubleClick={spanOnDoubleClickHandler}>{props.title}</span>
    }
)

