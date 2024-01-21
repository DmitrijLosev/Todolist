import {v1} from "uuid";
import {
    addTaskAC,
    addTodoAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskAC,
    deleteTodoAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

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
        addedDate:""},
            {id: v1(), title: "JS", status:TaskStatuses.Completed,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId1,
                order: 0,
                addedDate:""},
            {id: v1(), title: "React", status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId1,
                order: 0,
                addedDate:""},
            {id: v1(), title: "Redux", status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId1,
                order: 0,
                addedDate:""}],
        [todolistsId2]: [
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
        ]
    };
})

test("delete task by todoId and taskId", () => {


    const changedState = tasksReducer(initialState,
        deleteTaskAC(todolistsId1,initialState[todolistsId1][1].id))

    expect(changedState[todolistsId1].length).toBe(3);
    expect(changedState[todolistsId2].length).toBe(3);
    expect(changedState[todolistsId1][0].title).toBe("HTML&CSS");
    expect(changedState[todolistsId1][1].title).toBe("React");
    expect(changedState[todolistsId1].every(t=>t.title !== "JS")).toBeTruthy()

})
test("add new task", () => {


    const changedState = tasksReducer(initialState,
        addTaskAC("Typescript",todolistsId1))

    expect(changedState[todolistsId1].length).toBe(5);
    expect(changedState[todolistsId2].length).toBe(3);
    expect(changedState[todolistsId1][0].title).toBe("Typescript");
    expect(changedState[todolistsId1][1].title).toBe("HTML&CSS");
})

test("change task title by todoId and taskId", () => {


    const changedState = tasksReducer(initialState,
        changeTaskTitleAC(todolistsId2,initialState[todolistsId2][1].id,"Nuts"))

    expect(changedState[todolistsId1].length).toBe(4);
    expect(changedState[todolistsId2].length).toBe(3);
    expect(changedState[todolistsId2][0].title).toBe("Beer");
    expect(changedState[todolistsId2][1].title).toBe("Nuts");
    expect(changedState[todolistsId2][2].title).toBe("Chips");
})
test("change task status by todoId and taskId", () => {


    const changedState = tasksReducer(initialState,
        changeTaskStatusAC(initialState[todolistsId2][1].id,TaskStatuses.InProgress, todolistsId2))

    expect(changedState[todolistsId2][0].status).toBe(TaskStatuses.New)
    expect(changedState[todolistsId2][1].status).toBe(TaskStatuses.InProgress)
    expect(changedState[todolistsId2][2].status).toBe(TaskStatuses.New)
})
test("delete all tasks because todo was deleted", () => {

    const changedState = tasksReducer(initialState,
        deleteTodoAC(todolistsId2))

    expect(changedState[todolistsId1].length).toBe(4);
    expect(changedState[todolistsId2]).toBeUndefined();

})
test("add empty task list", () => {

const newTodoId=v1()
    const changedState = tasksReducer(initialState,
       addTodoAC(newTodoId,newTodoId))

    expect(Object.keys(changedState).length).toBe(3)
    expect(changedState[todolistsId1].length).toBe(4);
    expect(changedState[todolistsId2].length).toBe(3);
    expect(changedState[newTodoId].length).toBe(0);
    expect(changedState[newTodoId]).not.toBeUndefined()
    expect(changedState[newTodoId]).toStrictEqual([])
})