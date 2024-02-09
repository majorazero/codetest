import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
    return (
        <div>
            Hello World
        </div>
    )
};

export default App;

const root = createRoot(document.getElementById('react-app'));
root.render(<App />);