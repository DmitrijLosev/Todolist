import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";


type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
    itemTitle: string
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItem, itemTitle,}) => {
    console.log("additemform")
    const [newTitle, setNewTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error) {setError(null)}
        if (e.key === "Enter") {
            addItemHandler()
        }
    }
    const addItemHandler = () => {
        if (newTitle.trim()) {
            addItem(newTitle.trim());
            setNewTitle("")
        } else {
            setError("Field is required")
        }
    }

    return <div>
        <TextField value={newTitle} onChange={onChangeInputHandler} onKeyDown={onKeyPressInputHandler}
                   className={error ? "error" : ""} id="standard-basic" label={itemTitle} variant="standard"
                   sx={{"vertical-align": "unset"}} error={!!error} helperText={error}/>
        <IconButton onClick={addItemHandler}
                    color="primary">
            <AddBoxRoundedIcon/>
        </IconButton>
    </div>
}
)