import {v1} from "uuid";
import {
    addTask, changeTaskProperty,
    deleteTask,
    setTasks, setTasksEntityStatus,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {addTodolist, deleteTodolist, setTodolists} from "./todolist-reducer";

let todolistsId1:string
let todolistsId2:string
let initialState:TasksStateType
beforeEach(()=>{
     todolistsId1 = v1();
     todolistsId2 = v1();
    initialState ={
        [todolistsId1]: [
            {id: v1(),
                title: "HTML&CSS",
                status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId1,
                order: 0,
                entityTaskStatus:"idle",
        addedDate:""},
            {id: v1(), title: "JS", status:TaskStatuses.Completed,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId1,
                order: 0,
                entityTaskStatus:"idle",
                addedDate:""},
            {id: v1(), title: "React", status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId1,
                entityTaskStatus:"idle",
                order: 0,
                addedDate:""},
            {id: v1(), title: "Redux", status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId1,
                entityTaskStatus:"idle",
                order: 0,
                addedDate:""}],
        [todolistsId2]: [
            {id: v1(), title: "Beer", status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId2,
                entityTaskStatus:"idle",
                order: 0,
                addedDate:""},
            {id: v1(), title: "Dry fish", status:TaskStatuses.Completed,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId2,
                entityTaskStatus:"idle",
                order: 0,
                addedDate:""},
            {id: v1(), title: "Chips", status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId2,
                entityTaskStatus:"idle",
                order: 0,
                addedDate:""}
        ]
    };
})

test("delete task by todoId and taskId", () => {


    const changedState = tasksReducer(initialState,
        deleteTask({todoId:todolistsId1,id:initialState[todolistsId1][1].id}))

    expect(changedState[todolistsId1].length).toBe(3);
    expect(changedState[todolistsId2].length).toBe(3);
    expect(changedState[todolistsId1][0].title).toBe("HTML&CSS");
    expect(changedState[todolistsId1][1].title).toBe("React");
    expect(changedState[todolistsId1].every(t=>t.title !== "JS")).toBeTruthy()

})
test("add new task", () => {


    const changedState = tasksReducer(initialState,
        addTask({task:{id: v1(), title: "Apple", status:TaskStatuses.New,
            description:"",
            priority: TaskPriorities.Low,
            startDate:null,
            deadline: null,
            todoListId:todolistsId2,
            order: 0,
            addedDate:""}}))

    expect(changedState[todolistsId1].length).toBe(4);
    expect(changedState[todolistsId2].length).toBe(4);
    expect(changedState[todolistsId2][0].title).toBe("Apple");
    expect(changedState[todolistsId2][1].title).toBe("Beer");
})

test("change task title", () => {


    const changedState = tasksReducer(initialState,
        changeTaskProperty({task:{...initialState[todolistsId2][2],title: "Meat"} }))

    expect(changedState[todolistsId1].length).toBe(4);
    expect(changedState[todolistsId2].length).toBe(3);
    expect(changedState[todolistsId2][0].title).toBe("Beer");
    expect(changedState[todolistsId2][1].title).toBe("Dry fish");
    expect(changedState[todolistsId2][2].title).toBe("Meat");
})
test("change task status by todoId and taskId", () => {

    const changedState = tasksReducer(initialState,
        changeTaskProperty( {task:{...initialState[todolistsId1][0],status:TaskStatuses.Completed}}))

    expect(changedState[todolistsId1][0].status).toBe(TaskStatuses.Completed)
    expect(changedState[todolistsId2][0].status).toBe(TaskStatuses.New)
})
test("delete all tasks because todo was deleted", () => {

    const changedState = tasksReducer(initialState,
        deleteTodolist({todoId :todolistsId2}))

    expect(changedState[todolistsId1].length).toBe(4);
    expect(changedState[todolistsId2]).toBeUndefined();

})
test("add empty task list", () => {


    const changedState = tasksReducer({},
       addTodolist({todolist:{id: todolistsId1, title: "What to learn",addedDate: "",
           order: 0}}))

    expect(Object.keys(changedState).length).toBe(1)
    expect(changedState[todolistsId1].length).toBe(0);

})

test("add todolists with empty tasks in task state", () => {

    const changedState = tasksReducer({},
        setTodolists({todolists:[
            {id: todolistsId1, title: "What to learn",addedDate: "",
                order: 0},
            {id: todolistsId2, title: "What to buy",addedDate: "",
                order: 0}
        ]}))

    expect(Object.keys(changedState)).toStrictEqual([todolistsId1,todolistsId2])
    expect(Object.keys(changedState[todolistsId1]).length).toBe(0);
    expect(Object.keys(changedState[todolistsId1]).length).toBe(0);
})

test("set tasks by todo id", () => {

    const changedState = tasksReducer({["1"]:[],["2"]:[]},
        setTasks({todolistId:"2",tasks: [
            {id: v1(), title: "Beer", status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId2,
                order: 0,
                addedDate:""},
            {id: v1(), title: "Dry fish", status:TaskStatuses.Completed,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId2,
                order: 0,
                addedDate:""},
            {id: v1(), title: "Chips", status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId2,
                order: 0,
                addedDate:""}
        ]}))

    expect(changedState["1"].length).toBe(0)
    expect(changedState["2"].length).toBe(3)
    expect(changedState["2"].every(t=>t.title!=="")).toBeTruthy();
})
test("set tasks entity status should be correct", () => {

    const changedState = tasksReducer(initialState, setTasksEntityStatus({todolistId:todolistsId1,taskId:initialState[todolistsId1][3].id, status:"loading"}))

    expect(changedState[todolistsId1].filter(t=>t.title ==="Redux")[0].entityTaskStatus).toBe("loading")

})