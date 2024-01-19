import {useEffect, useState} from "react";
import {TaskType, todolistsApi, UpdateTaskModelType} from "../api/todolists-api";


export default {
    title: "API"
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        (async () => {
                let resData = await todolistsApi.getTodolists()
                setState(resData)
            }
        )()

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [todoTitle, setTodoTitle] = useState<string>("")

    const createTodo = async () => {
        let res1 = await todolistsApi.getTodolists()
        console.log("until create Todo", res1)
        let resData = await todolistsApi.createTodolist(todoTitle)
        setState(resData)
        let res2 = await todolistsApi.getTodolists()
        console.log("after create Todo", res2)
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input onChange={(e) => setTodoTitle(e.currentTarget.value)} value={todoTitle}/>
        <button onClick={createTodo}>Create Todolist</button>
    </>
}
export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>("")

    const deleteTodo = async () => {
        let res1 = await todolistsApi.getTodolists()
        console.log("until delete Todo", res1)
        let resData = await todolistsApi.deleteTodolist(todoId)
        setState(resData)
        let res2 = await todolistsApi.getTodolists()
        console.log("after delete Todo", res2)
    }


    return <>
        <div>{JSON.stringify(state)}</div>
        <input onChange={(e) => setTodoId(e.currentTarget.value)} value={todoId}/>
        <button onClick={deleteTodo}>Delete Todolist</button>
    </>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>("")
    const [todoTitle, setTodoTitle] = useState<string>("")

    const updateTodoTitle = async () => {
        let res1 = await todolistsApi.getTodolists()
        console.log("until update TodoTitle", res1.filter(t => t.id === todoId)[0])
        let resData = await todolistsApi.updateTodlistTitle(todoId, todoTitle)
        setState(resData)
        let res2 = await todolistsApi.getTodolists()
        console.log("after update TodoTitle", res2.filter(t => t.id === todoId)[0])
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={"Todolist ID"}
               onChange={(e) => setTodoId(e.currentTarget.value)} value={todoId}/>
        <input placeholder={"Todolist Title"}
               onChange={(e) => setTodoTitle(e.currentTarget.value)} value={todoTitle}/>
        <button onClick={updateTodoTitle}>Update title of todolist</button>
    </>
}
export const GetTasksOfTodolistById = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>("")

    const getTasks = async () => {
        let resData = await todolistsApi.getTasks(todoId)
        setState(resData)
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={"Todolist ID"}
               onChange={(e) => setTodoId(e.currentTarget.value)} value={todoId}/>
        <button onClick={getTasks}>Get tasks of todolist</button>
    </>
}
export const CreateTaskInTodolistsByID = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>("")
    const [taskTitle, setTaskTitle] = useState<string>("")

    const createTask = async () => {
        let res1 = await todolistsApi.getTasks(todoId)
        console.log("until create task", res1.items)
        let resData = await todolistsApi.createTask(taskTitle, todoId)
        setState(resData)
        let res2 = await todolistsApi.getTasks(todoId)
        console.log("after create task", res2.items)
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={"Todolist ID"}
               onChange={(e) => setTodoId(e.currentTarget.value)} value={todoId}/>
        <input placeholder={"Task Title"}
               onChange={(e) => setTaskTitle(e.currentTarget.value)} value={taskTitle}/>
        <button onClick={createTask}>Create task</button>
    </>
}
export const DeleteTaskByIdAndTodolistsId = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const deleteTask = async () => {
        let res1 = await todolistsApi.getTasks(todoId)
        console.log("until delete task", res1.items)
        let resData = await todolistsApi.deleteTask(todoId, taskId)
        setState(resData)
        let res2 = await todolistsApi.getTasks(todoId)
        console.log("after delete task", res2.items)
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={"Todolist ID"}
               onChange={(e) => setTodoId(e.currentTarget.value)} value={todoId}/>
        <input placeholder={"Task ID"}
               onChange={(e) => setTaskId(e.currentTarget.value)} value={taskId}/>
        <button onClick={deleteTask}>Delete task</button>
    </>
}


export const UpdateTaskPropertyByIdAndTodolistsId = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>("e1c08ef4-8b12-407b-8470-7c1069133309")
    const [taskId, setTaskId] = useState<string>("dc2ade84-f7e7-4e87-9ad2-bd98693c8b3c")
    const [taskPropertyKey, setPropertyKey] = useState<string>("")
    const [taskPropertyValue, setPropertyValue] = useState<string>("")
    const [updateTaskModel, setUpdateTaskModel] = useState<UpdateTaskModelType>({} as UpdateTaskModelType)
    const [task, setTask] = useState<TaskType>({} as TaskType)

    useEffect(() => {
        (async () => {
            let resData = await todolistsApi.getTasks(todoId)
            setTask(resData.items.filter(i => i.id === taskId)[0])
        })()

        let startUpdateTaskModel = (({title, description, completed, status, priority, startDate, deadline}) => ({
            title,
            description,
            completed,
            status,
            priority,
            startDate,
            deadline
        }))(task)
        setUpdateTaskModel(startUpdateTaskModel)
    }, [])

    const updateTask = async () => {
        let res1 = await todolistsApi.getTasks(todoId)
        console.log("until update task", res1.items.filter(t=>t.id===taskId))
        let resData = await todolistsApi.updateTask(todoId, taskId, {...updateTaskModel, [taskPropertyKey]: taskPropertyValue})
        setState(resData)
        let res2 = await todolistsApi.getTasks(todoId)
        console.log("after update task", res2.items.filter(t=>t.id===taskId))
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={"Todolist ID"}
               onChange={(e) => setTodoId(e.currentTarget.value)} value={todoId}/>
        <input placeholder={"Task ID"}
               onChange={(e) => setTaskId(e.currentTarget.value)} value={taskId}/>
        <input placeholder={"Task Property Key"}
               onChange={(e) => setPropertyKey(e.currentTarget.value)} value={taskPropertyKey}/>
        <input placeholder={"Task Property Value"}
               onChange={(e) => setPropertyValue(e.currentTarget.value)} value={taskPropertyValue}/>
        <button onClick={updateTask}>Update task</button>
    </>
}