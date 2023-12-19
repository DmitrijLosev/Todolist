import {StateType, userReducer} from "./user-reducer";


test("increment only age with reducer", () => {
    const initialState: StateType = {
        age: 20,
        childrenCount: 2,
        name: "Dimych"
    };

    const changedState = userReducer(initialState,
        {type: "INCREMENT-AGE"})

    expect(changedState.age).toBe(21);
    expect(changedState.childrenCount).toBe(2);
})
test("increment only children count with reducer", () => {
    const initialState: StateType = {
        age: 20,
        childrenCount: 2,
        name: "Dimych"
    };

    const changedState = userReducer(initialState,
        {type: "INCREMENT-CHILDREN-COUNT"})

    expect(changedState.age).toBe(20);
    expect(changedState.childrenCount).toBe(3);
})

test("change only user name with reducer", () => {
    const initialState: StateType = {
        age: 20,
        childrenCount: 2,
        name: "Dimych"
    };

    const changedState = userReducer(initialState,
        {type: "CHANGE-USER-NAME", newName:"Dima"})

    expect(changedState.name).toBe("Dima");
    expect(changedState.name.length).toBe(4);
})