import {
    InitialStateType, loginReducer,
    toggleIsLoggedIn
} from "./login-reducer";


let initialState:InitialStateType
beforeEach(()=>{
    initialState={
        isLoggedIn: false
}
})

test("should be correct login status", () => {
    const changedState =loginReducer(initialState,
        toggleIsLoggedIn({value:true}))
    expect(changedState.isLoggedIn).toBe(true);
})


