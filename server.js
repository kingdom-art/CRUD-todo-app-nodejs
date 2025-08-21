const express = require('express');
const app = express();
const PORT = 3000;

// middleware so we can parse JSON from requests
app.use(express.json());

// fake "database" - just an array 
let todos = [];
let idCounter = 1;

// Create - Add a new todo 
app.post ("/todos", (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }
    const newTodo = { id: idCounter++, task, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// READ - Get all todos
app.get("/todos", (req, res) => {
    res.json(todos);
});

// UPDATES - Updates a todo by id
app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    const todo = todos.find(t => t.id === parseInt(id));
    
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    
    if (task !== undefined) {
        todo.task = task;
    }
    if (completed !== undefined) {
        todo.completed = completed;
    }
    
    res.json(todo);
});
 
// DELETE - Delete a todo by id
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.filter(t => t.id != id);
    res.json({message: "Todo deleted successfully"});
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});