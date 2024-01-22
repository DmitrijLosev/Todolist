import {v1} from "uuid";
import {
    addTodoAC,
    changeTodoFilterAC,
    changeTodoTitleAC,
    deleteTodoAC, FilterType, setTodolistsAC, TodolistAppType,
    todolistReducer,
} from "./todolist-reducer";

let todolistsId1:string;
let todolistsId2:string;
let initialState: TodolistAppType[]

beforeEach(()=>{
    todolistsId1 = v1();
    todolistsId2 = v1();
  initialState = [
        {id: todolistsId1, title: "What to learn", filter: "all",addedDate: "",
            order: 0},
        {id: todolistsId2, title: "What to buy", filter: "all",addedDate: "",
            order: 0}
    ];
})

test("delete todo by id", () => {
    const changedState = todolistReducer(initialState,
        deleteTodoAC(todolistsId1))

    expect(changedState.length).toBe(1);
    expect(changedState[0].id).toBe(todolistsId2);
})
test("add new todolist", () => {

    const newTodoId=v1()

    const changedState = todolistReducer(initialState,
        addTodoAC("What to read",newTodoId))

    expect(changedState.length).toBe(3);
    expect(changedState[0].title).toBe("What to read");
    expect(changedState[0].filter).toBe("all");
    expect(changedState[0].id).not.toBe(todolistsId1 || todolistsId2);
})

test("change todolist title by id", () => {

    const changedState = todolistReducer(initialState,
        changeTodoTitleAC(todolistsId1, "What to read"))

    expect(changedState.length).toBe(2);
    expect(changedState[0].title).toBe("What to read");
    expect(changedState[0].id).toBe(todolistsId1);
    expect(changedState[1].title).toBe("What to buy");
})
test("change todolist filter to completed", () => {

    const newFilterValue: FilterType = "completed";
    const changedState = todolistReducer(initialState,
        changeTodoFilterAC(todolistsId2,newFilterValue))

    expect(changedState.length).toBe(2);
    expect(changedState[1].filter).toBe("completed");
    expect(changedState[0].filter).toBe("all");
})
test("set todolists to state", () => {

    const changedState = todolistReducer([],
        setTodolistsAC(initialState))

    expect(changedState.length).toBe(2);
})
