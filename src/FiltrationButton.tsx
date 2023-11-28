import React from "react";
import {FilterType} from "./TodoList";

export const FiltrationButton: React.FC<{
    title: FilterType,
    changeFilter: (filtration: FilterType, todolistId:string)=>void
    filterValue:FilterType
    id:string
}> = ({title, changeFilter,filterValue,id}) => {

    const onClickFilterButtonHandler=() => changeFilter(title, id);

    return (
        <button onClick={onClickFilterButtonHandler} className={filterValue===title ? "active-filter" : ""}>{title}</button>
    );
};

