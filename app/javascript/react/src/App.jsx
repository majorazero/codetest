import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import ToDo from "./component/ToDo";

const App = () => {
    const [todos, setTodos] = useState([]);

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
                todo
            }

            return <ToDo key={`todo-${todo.id}-${i}`} options={options} />
        })
    }

    return (
        <div className="app">
            {todoRenderer()}
        </div>
    )
};

export default App;

const root = createRoot(document.getElementById('react-app'));
root.render(<App />);