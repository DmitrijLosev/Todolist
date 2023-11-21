import React from "react";
import {TaskType} from "./App";

export const Task:React.FC<{task:TaskType, deleteTask:(id:string)=>void}>= ({task,deleteTask}) => {


    return (
     <li key={task.id}>
        <input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
         <button onClick={()=>{deleteTask(task.id)}}>x</button>
    </li>
    );
};

