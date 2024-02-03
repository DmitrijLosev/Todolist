import React from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import {useAddItemForm} from "./useAddItemForm/useAddItemForm";


type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
    itemTitle: string
    disable?:boolean
}
export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItem, itemTitle,disable=false}) => {

        const {
            newTitle,
            onChangeInputHandler,
            onKeyPressInputHandler,
            error,
            addItemHandler
        } = useAddItemForm(addItem)

        return <div>
            <TextField value={newTitle} onChange={onChangeInputHandler} onKeyDown={onKeyPressInputHandler}
                       className={error ? "error" : ""} id="standard-basic" label={itemTitle} variant="standard"
                       sx={{"vertical-align": "unset"}} error={!!error} helperText={error} disabled={disable}/>
            <IconButton onClick={addItemHandler}
                        color="primary" disabled={disable}>
                <AddBoxRoundedIcon/>
            </IconButton>
        </div>
    }
)