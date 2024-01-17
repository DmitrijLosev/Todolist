import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = (addItem: (newTitle: string) => void) =>
{
    const [newTitle, setNewTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
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
    return {
        newTitle,
        onChangeInputHandler,
        onKeyPressInputHandler,
        error,
        addItemHandler
    }
}