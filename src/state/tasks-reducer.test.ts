import {v1} from "uuid";
import {TasksStateType} from "../App";
import {
    addTaskAC, addTodoAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskAC, deleteTodoAC,
    tasksReducer
} from "./tasks-reducer";

let todolistsId1:string
let todolistsId2:string
let initialState:TasksStateType
beforeEach(()=>{
     todolistsId1 = v1();
     todolistsId2 = v1();
    initialState ={
        [todolistsId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}],
        [todolistsId2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Dry fish", isDone: false},
            {id: v1(), title: "Chips", isDone: true}
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
        changeTaskStatusAC(initialState[todolistsId2][1].id,true,todolistsId2))

    expect(changedState[todolistsId2][0].isDone).toBeTruthy()
    expect(changedState[todolistsId2][1].isDone).toBeTruthy()
    expect(changedState[todolistsId2][2].isDone).toBeTruthy()
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