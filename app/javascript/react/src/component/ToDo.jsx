import React, { useState, useEffect } from "react";

const ToDo = ({options}) => {
    const {
        todo
    } = options;

    return (
        <div>
            <h3>To Do {todo.id}</h3>
            <p>{todo.description}</p>
        </div>
    )
}

export default ToDo;