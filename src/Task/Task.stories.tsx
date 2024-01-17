import {Task} from "./Task";
import {Provider} from "react-redux";
import {RootStateType, store} from "../state/store";
import {action} from "@storybook/addon-actions";

type StoreType=typeof store
export default {
    title:"SingleTask"
}
const callback=action("dispatch")
export const DoneAndNoDoneTasksExample = () =>{
    let store={
        getState:function (){return {} as RootStateType},
        dispatch:function (A) {
            return callback(A.payload)
        },
        subscribe:function (callbackListener){}
    } as StoreType
    return <Provider store={store}>
        <Task task={{id:"1", isDone:true, title:"Storybook"}} todoId={"todolist2"} key={"1"}/>
        <Task task={{id:"2", isDone:false, title:"UnitTest"}} todoId={"todolist2"} key={"2"}/>
    </Provider>
}