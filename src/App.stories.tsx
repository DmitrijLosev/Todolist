
import App from "./App";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";



export default {
    title:"AppWithRedux",
    component:App,
    decorators:ReduxStoreProviderDecorator
}

export const AppWithReduxExample = () =>{

    return <App/>
}