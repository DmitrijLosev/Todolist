import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions"
export default  {
    title:"FormForAddItems",
    component:AddItemForm
}
const callback = action("Button add was pressed")
export const AddItemFormExample = () => {
    return <AddItemForm addItem={(newTitle)=> {callback(newTitle) }} itemTitle={"Form for..."}/>
}


