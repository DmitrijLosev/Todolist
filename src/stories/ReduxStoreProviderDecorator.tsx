import {Provider} from "react-redux";
import {combineReducers,  legacy_createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistReducer} from "../state/todolist-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})
const todolistsId1=v1();
const todolistsId2 =v1();
const initialAppState= {
    tasks: {
        [todolistsId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}],
        [todolistsId2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Dry fish", isDone: false},
            {id: v1(), title: "Chips", isDone: true}
        ]
    },
    todolists: [
        {id: todolistsId1, title: "What to learn", filter: "all"},
        {id: todolistsId2, title: "What to buy", filter: "all"}
    ]
}

export type RootStateType=ReturnType<typeof rootReducer>

const storyBookStore = legacy_createStore(rootReducer,  initialAppState as RootStateType & undefined )

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}