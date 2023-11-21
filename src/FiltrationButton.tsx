import React from "react";
import {FilterType} from "./TodoList";

export const FiltrationButton: React.FC<{
    title: FilterType,
    changeFilter: (filtration: FilterType)=>void
    filterValue:FilterType
}> = ({title, changeFilter,filterValue}) => {

    const onClickFilterButtonHandler=() => changeFilter(title);

    return (
        <button onClick={onClickFilterButtonHandler} className={filterValue===title ? "active-filter" : ""}>{title}</button>
    );
};

