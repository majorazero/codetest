import React, { useState, useEffect } from "react";

const ToDo = ({options}) => {
    const {
        todo,
        index,
        todos,
        setTodos
    } = options;

    const [edit, setEdit] = useState(false);
    const [saving, setSaving] = useState(false);
    const [done, setDone] = useState(!!todo.done);
    const [description, setDescription] = useState(todo.description);

    const apiCall = async (method, route, payload) => {
        const options = {
            method,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'X-CSRF-Token':document.head.querySelector("[name='csrf-token']").content
            },
        };
        if (payload) options.body = JSON.stringify(payload);
        
        return await fetch(route, options)
    }

    const save = async () => {
        const method = "PATCH"
        const route = `/to_dos/${todo.id}`;
        const response = await apiCall(method, route, {
            to_do: {
                done,
                description
            }
        })

        const resp = await response.json();

        if (response.status > 400) {
            alert(`Todo was not updated! Something went wrong, Error: ${resp.description}`)
            setSaving(false);
            return;
        }

        const tempTodos = [...todos];
        tempTodos.splice(index, 1);
        tempTodos.unshift(resp)
        setTodos(tempTodos);
        setEdit(false);
        setSaving(false);
    }

    const destroy = async () => {
        const method = "DELETE";
        const route = `/to_dos/${todo.id}`;
        const response = await apiCall(method, route);

        if (response.status >= 400) {
            alert(`To-do destroyed`)
            const tempTodos = [...todos];
            tempTodos.splice(index, 1);
            setTodos(tempTodos);
        }
    }


    const handleDone = () => {
        setDone(!done);
        setSaving(true);
    }

    useEffect(() => {
        if (saving) save();
    }, [save]);

    return (
        <div>
            <h3>
                To Do {todo.id}
                <input type="checkbox" checked={done} onChange={handleDone}></input>
            </h3>
            {!edit && <p>{description}</p>}
            {edit && <textarea onChange={(e) => setDescription(e.target.value)} value={description}/>}
            <br/>
            {edit && <button onClick={() => setSaving(true)}>Save</button>}
            <div>
                {!edit && <button disabled={edit} onClick={() => setEdit(true)}>Edit</button>}
                {!edit && <button disabled={edit} onClick={destroy}>Destroy</button>}
            </div>
        </div>
    )
}

export default ToDo;