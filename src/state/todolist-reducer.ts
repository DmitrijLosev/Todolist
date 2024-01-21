
const initialState=[] as TodolistAppType[]

export const todolistReducer = (state: TodolistAppType[] = initialState, action: TodoActionsType): TodolistAppType[] => {
    switch (action.type) {
        case "DELETE-TODOLIST" :
            return state.filter(t => t.id !== action.payload.todoId)
        case "ADD-TODOLIST" :
            return [{
                id: action.payload.newTodolistId,
                title: action.payload.todolistTitle,
                filter: "all",
                addedDate: "",
                order: 0
            }, ...state]
        case "CHANGE-TODOLIST-TITLE" :
            return state.map(t => t.id === action.payload.todolistId
                ? {...t, title: action.payload.newTodolistTitle} : t)
        case "CHANGE-TODOLIST-FILTER" :
            return state.map(t => t.id === action.payload.todolistId
                ? {...t, filter: action.payload.newTodolistFilter} : t)
        default:
            return state
    }
}

export const deleteTodoAC = (todoId: string) => ({type: "DELETE-TODOLIST", payload: {todoId}}) as const
export const addTodoAC = (todolistTitle: string,newTodolistId:string) => ({
    type: "ADD-TODOLIST",
    payload: {todolistTitle, newTodolistId}
}) as const;
export const changeTodoTitleAC = (todolistId: string, newTodolistTitle: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    payload: {todolistId, newTodolistTitle}
}) as const;
export const changeTodoFilterAC = (todolistId: string, newTodolistFilter: FilterType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {todolistId, newTodolistFilter}
}) as const;


export type FilterType = "all" | "active" | "completed"
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type TodolistAppType = TodolistType & {filter:FilterType}
export type TodoActionsType =
    ReturnType<typeof deleteTodoAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>