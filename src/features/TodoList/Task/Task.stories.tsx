import {Task} from "./Task";
import {Provider} from "react-redux";
import {store} from "../../../state/store";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "../../../stories/ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "../../../api/todolists-api";

type StoreType=typeof store
export default {
    title:"SingleTask",
    decorators:ReduxStoreProviderDecorator
}
const callback=action("dispatch")
export const DoneAndNoDoneTasksExample = () =>{
    let store={
        getState:function (){return {} as any},
        dispatch:function (A:any) {
            return callback(A.payload)
        },
        subscribe:function (callbackListener){}
    } as StoreType
    return <Provider store={store}>
        <Task task={{id:"1", title:"Storybook",status:TaskStatuses.New,
            description:"",
            priority: TaskPriorities.Low,
            startDate:null,
            deadline: null,
            todoListId:"todolist2",
            order: 0,
            addedDate:""}} todoId={"todolist2"} key={"1"}/>
        <Task task={{id:"2", title:"UnitTest",status:TaskStatuses.Completed,
            description:"",
            priority: TaskPriorities.Low,
            startDate:null,
            deadline: null,
            todoListId:"todolist2",
            order: 0,
            addedDate:""}} todoId={"todolist2"} key={"2"}/>
    </Provider>
}
