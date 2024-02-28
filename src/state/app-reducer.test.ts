import {
    appReducer,
    InitialStateType,
    setAppError,
    setAppInitialized,
    setAppStatus,
    setUserData
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
        setAppError("Error"))
    expect(changedState.error).toBe("Error");
})
test("correct status should be set", () => {
    const changedState =appReducer(initialState,
        setAppStatus("loading"))
    expect(changedState.status).toBe("loading");
})
test("correct initialization should be set", () => {
    const changedState =appReducer(initialState,
        setAppInitialized(true))
    expect(changedState.isAppInitialized).toBe(true);
})
test("set user data in state", () => {
    const changedState =appReducer(initialState,
        setUserData({email:"xxx@.com", login:"Dima", id: 1221}))
    expect(changedState.userData?.email).toBe("xxx@.com");
    expect(changedState.userData?.login).toBe("Dima");
    expect(changedState.userData?.id).toBe( 1221);
})

