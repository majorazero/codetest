export const organizeTodos = (todos, item) => {
    // making this for the sake of a simple unit test, and we'll mirror the behavior on the backend
    // the goal is to make the list ordered by last_updated desc with a split between done and not done
    if (item.done) {
        let inserted = false;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].done) {
                todos.splice(i, 0, item);
                inserted = true;
                break;
            }
        }
        if (!inserted) todos.push(item);
    } else {
        // only for new items
        todos.unshift(item);
    }
} 