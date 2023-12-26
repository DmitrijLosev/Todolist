import {TasksStateType} from "../App";
import {v1} from "uuid";

//TYPES
export type TaskActionsType =
    DeleteTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | DeleteTodoAllTasksActionType
    | AddEmptyTaskListActionType
type DeleteTaskActionType = {
    type: "DELETE-TASK",
    payload: { todoId: string, id: string }
}
type AddTaskActionType = {
    type: "ADD-TASK"
    payload: { newTaskTitle: string, todoId: string }
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    payload: {
        todoId: string
        taskId: string
        newTitle: string
    }
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    payload: {
        idIsDone: string,
        isRealDone: boolean,
        todoId: string
    }
}
type DeleteTodoAllTasksActionType = {
    type: "DELETE-TODO-ALL-TASKS"
    payload: {
        id:string
    }
}
type AddEmptyTaskListActionType = {
    type: "ADD-EMPTY-TASK-LIST"
    payload: {newTodolistId:string}
}

//REDUCER LOGIC
export const tasksReducer = (state: TasksStateType, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case "DELETE-TASK" :
            return {...state, [action.payload.todoId]: state[action.payload.todoId].filter(t => t.id !== action.payload.id)}
        case "ADD-TASK" :
            return {...state, [action.payload.todoId]: [{id: v1(), title: action.payload.newTaskTitle, isDone: false}, ...state[action.payload.todoId]]}
        case "CHANGE-TASK-TITLE" :
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)}
        case "CHANGE-TASK-STATUS" :
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(t => t.id === action.payload.idIsDone ? {...t, isDone: action.payload.isRealDone} : t)}
        case "DELETE-TODO-ALL-TASKS" :
            const copyState={...state}
            delete copyState[action.payload.id]
            return copyState
        case "ADD-EMPTY-TASK-LIST" :
            return {...state, [action.payload.newTodolistId]: []}
        default:
            throw new Error("I don't understand action type")
    }
}

//ACTION CREATORS
export const deleteTaskAC = (todoId: string, id: string): DeleteTaskActionType => ({
    type: "DELETE-TASK",
    payload: {todoId, id}
})
export const addTaskAC = (newTaskTitle: string, todoId: string): AddTaskActionType => ({
    type: "ADD-TASK",
    payload: {newTaskTitle, todoId}
})
export const changeTaskTitleAC = (todoId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType => ({
    type: "CHANGE-TASK-TITLE",
    payload: {todoId, taskId, newTitle}
})
export const changeTaskStatusAC = (idIsDone: string, isRealDone: boolean, todoId: string): ChangeTaskStatusActionType => ({
    type: "CHANGE-TASK-STATUS",
    payload: {idIsDone, isRealDone, todoId}
})
export const deleteTodoAllTasksAC = (id: string): DeleteTodoAllTasksActionType => ({
    type: "DELETE-TODO-ALL-TASKS",
    payload: {id}
})
export const addEmptyTaskListAC = (newTodolistId:string): AddEmptyTaskListActionType => ({
    type: "ADD-EMPTY-TASK-LIST",
    payload: {newTodolistId}
})
