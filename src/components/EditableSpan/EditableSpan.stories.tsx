import {action} from "@storybook/addon-actions"
import {EditableSpan} from "./EditableSpan";
export default  {
    title:"EditableSpan",
}
const callback = action("Accept new edit title")
export const EditableSpanExample = () => {
    return <EditableSpan title={"Some title here"} callback={(newTitle)=>callback(newTitle)}/>
}
export const EditableSpanDisableExample = () => {
    return <EditableSpan title={"Some title here"} callback={(newTitle)=>callback(newTitle)}/>
}