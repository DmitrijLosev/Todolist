import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let initialState:InitialStateType
beforeEach(()=>{
    initialState={
    status:"idle",
        error:null
}
})

test("correct error message should be set", () => {
    const changedState =appReducer(initialState,
        setAppErrorAC("Error"))
    expect(changedState.error).toBe("Error");
})
test("correct status should be set", () => {
    const changedState =appReducer(initialState,
        setAppStatusAC("loading"))
    expect(changedState.status).toBe("loading");
})
