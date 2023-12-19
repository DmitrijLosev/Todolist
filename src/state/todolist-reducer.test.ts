import {v1} from "uuid";
import {TodolistType} from "../App";
import {addTodoAC, changeTodoFilterAC, changeTodoTitleAC, deleteTodoAC, todolistReducer} from "./todolist-reducer";
import {FilterType} from "../TodoList";

test("delete todo by id", () => {
    const todolistsId1 = v1();
    const todolistsId2 = v1();
    const initialState: TodolistType[] = [
        {id: todolistsId1, title: "What to learn", filter: "all"},
        {id: todolistsId2, title: "What to buy", filter: "all"}
    ];

    const changedState = todolistReducer(initialState,
        deleteTodoAC(todolistsId1))

    expect(changedState.length).toBe(1);
    expect(changedState[0].id).toBe(todolistsId2);
})
test("add new todolist", () => {
    const todolistsId1 = v1();
    const todolistsId2 = v1();
    const initialState: TodolistType[] = [
        {id: todolistsId1, title: "What to learn", filter: "all"},
        {id: todolistsId2, title: "What to buy", filter: "all"}
    ];

    const changedState = todolistReducer(initialState,
        addTodoAC("What to read"))

    expect(changedState.length).toBe(3);
    expect(changedState[0].title).toBe("What to read");
    expect(changedState[0].filter).toBe("all");
    expect(changedState[0].id).not.toBe(todolistsId1 || todolistsId2);
})

test("change todolist title by id", () => {
    const todolistsId1 = v1();
    const todolistsId2 = v1();
    const initialState: TodolistType[] = [
        {id: todolistsId1, title: "What to learn", filter: "all"},
        {id: todolistsId2, title: "What to buy", filter: "all"}
    ];

    const changedState = todolistReducer(initialState,
        changeTodoTitleAC(todolistsId1, "What to read"))

    expect(changedState.length).toBe(2);
    expect(changedState[0].title).toBe("What to read");
    expect(changedState[0].id).toBe(todolistsId1);
    expect(changedState[1].title).toBe("What to buy");
})
test("change todolist filter to completed", () => {
    const todolistsId1 = v1();
    const todolistsId2 = v1();
    const initialState: TodolistType[] = [
        {id: todolistsId1, title: "What to learn", filter: "all"},
        {id: todolistsId2, title: "What to buy", filter: "all"}
    ];
    const newFilterValue: FilterType = "completed";
    const changedState = todolistReducer(initialState,
        changeTodoFilterAC(todolistsId2,newFilterValue))

    expect(changedState.length).toBe(2);
    expect(changedState[1].filter).toBe("completed");
    expect(changedState[0].filter).toBe("all");
})