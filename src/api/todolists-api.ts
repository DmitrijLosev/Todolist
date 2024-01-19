const base_Url = "https://social-network.samuraijs.com/api/1.1" as const

const settings = {
    method: "GET",
    credentials: "include" as const,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "API-KEY": "99e456ee-d6c6-4a9b-9a62-843b8099abfe"
    }
}


const getResponse = async (response: Promise<Response>) => {
    let res = await response;
    return res.json()
}
export const todolistsApi = {
    getTodolists(): Promise<TodolistType[]> {
        return getResponse(fetch(`${base_Url}/todo-lists`, settings))
    },
    createTodolist(title: string): Promise<ResponseType<{ item: TodolistType }>> {
        return getResponse(fetch(`${base_Url}/todo-lists`, {
            ...settings,
            method: "POST",
            body: JSON.stringify({title})
        }))
    },
    deleteTodolist(todolistId: string): Promise<ResponseType> {
        return getResponse(fetch(`${base_Url}/todo-lists/${todolistId}`, {
            ...settings,
            method: "DELETE"
        }))
    },
    updateTodlistTitle(todolistId: string, title: string): Promise<ResponseType> {
        return getResponse(fetch(`${base_Url}/todo-lists/${todolistId}`, {
            ...settings,
            method: "PUT",
            body: JSON.stringify({title})
        }))
    },
    getTasks(todolistId: string): Promise<TaskResponseType> {
        return getResponse(fetch(`${base_Url}/todo-lists/${todolistId}/tasks`, settings))
    },
    createTask(title: string, todolistId: string): Promise<ResponseType<{ item: TaskType }>> {
        return getResponse(fetch(`${base_Url}/todo-lists/${todolistId}/tasks`, {
            ...settings,
            method: "POST",
            body: JSON.stringify({title})
        }))
    },
    deleteTask(todolistId: string, taskId:string): Promise<ResponseType> {
        return getResponse(fetch(`${base_Url}/todo-lists/${todolistId}/tasks/${taskId}`, {
            ...settings,
            method: "DELETE"
        }))
    },
    updateTask(todolistId: string, taskId:string, updateTaskModel:UpdateTaskModelType):
        Promise<ResponseType<{ item: TaskType }>> {
        return getResponse(fetch(`${base_Url}/todo-lists/${todolistId}/tasks/${taskId}`, {
            ...settings,
            method: "PUT",
            body: JSON.stringify(updateTaskModel)
        }))
    },

}

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type ResponseType<D = {}> = {
    data: D,
    resultCode: number,
    messages: string[],
    fieldsErrors: string[]
}
export type TaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: null | string
}
export type TaskType = {
    description: string | null
    title: string
    completed: boolean
    status: string | number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType= {
    title: string
    description: string | null
    completed: boolean
    status: string | number
    priority: number
    startDate: string | null
    deadline: string | null
}
