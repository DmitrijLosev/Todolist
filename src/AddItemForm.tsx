import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType={
    addItem: (newTitle: string) => void
}

export const AddItemForm:React.FC<AddItemFormPropsType>=({addItem})=>{

    const [newTitle, setNewTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
        <input value={newTitle} onChange={onChangeInputHandler} onKeyDown={onKeyPressInputHandler}
               className={error ? "error" : ""}/>
        <button onClick={addItemHandler}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
}