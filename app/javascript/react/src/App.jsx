import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import ToDo from "./component/ToDo";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [addingNewTodo, setAddingNewTodo] = useState(false);
    const [hideDoneItems, setHideDoneItems] = useState(false);

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
        let tempTodos = [...todos];
        if (hideDoneItems) {
            tempTodos = tempTodos.filter((note) => !note.done);
        }
        return tempTodos.map((todo, i) => {
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
            <button onClick={getToDos}>Refresh</button>
            <span>
                <input type="checkbox" value={hideDoneItems} onChange={() => setHideDoneItems(!hideDoneItems)}/> Hide Done Items
            </span>
            {newTodo()}
            {todoRenderer()}
        </div>
    )
};

export default App;

const root = createRoot(document.getElementById('react-app'));
root.render(<App />);