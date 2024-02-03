import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistReducer} from "../state/todolist-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {thunk} from "redux-thunk";
import {appReducer} from "../state/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app:appReducer
})
const todolistsId1=v1();
const todolistsId2 =v1();
const initialAppState:RootStateType= {
    tasks: {
        [todolistsId1]: [
            {id: v1(),
                title: "HTML&CSS",
                status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId1,
                order: 0,
                addedDate:""},
            {id: v1(), title: "JS", status:TaskStatuses.Completed,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId1,
                order: 0,
                addedDate:""},
            {id: v1(), title: "React", status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId1,
                order: 0,
                addedDate:""},
            {id: v1(), title: "Redux", status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId1,
                order: 0,
                addedDate:""}],
        [todolistsId2]: [
            {id: v1(), title: "Beer", status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId2,
                order: 0,
                addedDate:""},
            {id: v1(), title: "Dry fish", status:TaskStatuses.Completed,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId2,
                order: 0,
                addedDate:""},
            {id: v1(), title: "Chips", status:TaskStatuses.New,
                description:"",
                priority: TaskPriorities.Low,
                startDate:null,
                deadline: null,
                todoListId:todolistsId2,
                order: 0,
                addedDate:""}
        ]
    },
    todolists: [
        {id: todolistsId1, title: "What to learn", filter: "all",addedDate: "",
            order: 0, entityStatus:"idle"},
        {id: todolistsId2, title: "What to buy", filter: "all",addedDate: "",
            order: 0, entityStatus:"idle"}
    ],
    app:{
        status:"idle",
        error:null
    }
}

export type RootStateType=ReturnType<typeof rootReducer>

const storyBookStore = legacy_createStore(rootReducer, initialAppState as RootStateType & undefined,
    applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}