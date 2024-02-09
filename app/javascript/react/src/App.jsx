import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import ToDo from "./component/ToDo";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [addingNewTodo, setAddingNewTodo] = useState(false);

    useEffect(() => {
        getToDos();
    }, []);

    const getToDos = () => {
        fetch("/to_dos")
        .then((response) => response.json())
        .then((data) => setTodos(data))
        .catch((err) => {
            alert(`There was an issue fetching todos. Err: ${err}`)
        });
    }

    const todoRenderer = () => {
        return todos.map((todo, i) => {
            const options = {
                todo,
                index: i,
                todos,
                setTodos
            }

            return <ToDo key={`todo-${todo.id}-${i}`} options={options} />
        })
    }

    const newTodo = () => {
        if (!addingNewTodo) return null;

        const options = {
            todo: {},
            editing: true,
            saveCallback: (response) => {
                let newTodos = [...todos];
                newTodos.unshift(response);
                setTodos(newTodos);
                setAddingNewTodo(false);
            }
        }

        return <ToDo options={options} />;
    }

    return (
        <div className="app">
            <button disabled={addingNewTodo} onClick={() => setAddingNewTodo(true)}>
                New Todo
            </button>
            {newTodo()}
            {todoRenderer()}
        </div>
    )
};

export default App;

const root = createRoot(document.getElementById('react-app'));
root.render(<App />);