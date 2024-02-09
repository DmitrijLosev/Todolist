import {
    appReducer,
    InitialStateType,
    setAppErrorAC,
    setAppInitializedAC,
    setAppStatusAC,
    setUserDataAC
} from "./app-reducer";
import {UserDataType} from "../api/todolists-api";

let initialState:InitialStateType
beforeEach(()=>{
    initialState={
    status:"idle",
        error:null,
        isAppInitialized:false,
        userData:null as UserDataType | null
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
test("correct initialization should be set", () => {
    const changedState =appReducer(initialState,
        setAppInitializedAC(true))
    expect(changedState.isAppInitialized).toBe(true);
})
test("set user data in state", () => {
    const changedState =appReducer(initialState,
        setUserDataAC({email:"xxx@.com", login:"Dima", id: 1221}))
    expect(changedState.userData?.email).toBe("xxx@.com");
    expect(changedState.userData?.login).toBe("Dima");
    expect(changedState.userData?.id).toBe( 1221);
})

