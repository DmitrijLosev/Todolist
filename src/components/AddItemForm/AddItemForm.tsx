import React from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import {useAddItemForm} from "./useAddItemForm/useAddItemForm";


type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
    itemTitle: string
}
export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItem, itemTitle,}) => {

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
                       sx={{"vertical-align": "unset"}} error={!!error} helperText={error}/>
            <IconButton onClick={addItemHandler}
                        color="primary">
                <AddBoxRoundedIcon/>
            </IconButton>
        </div>
    }
)