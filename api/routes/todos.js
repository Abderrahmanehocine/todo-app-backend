const express = require("express");
const router = express.Router();

let todos = [];

router.get("/", (req, res, next) => {
    res.status(200).json(todos);
});

router.get("/:taskId", (req, res, next) => {
    const todoId = parseInt(req.params.taskId, 10);
    const todo = todos.find(todo => todo.id === todoId);
    if(todo){
        res.status(200).json(todo);
    }
    else{
        res.status(404).json({
            message: `id: ${todoId} not found`
        });
    }
});

router.post("/", (req, res, next) => {
  console.log("Request body:", req.body);
  const { title, completed = false } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  const newTodo = {
    id: todos.length + 1, 
    title,
    completed
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.put("/:taskId", (req, res) => {
  const todoId = parseInt(req.params.taskId, 10); 
  const { title, completed } = req.body;

  console.log(`Updating todo with ID: ${todoId}`);
  const todo = todos.find(todo => todo.id === todoId);

  if (todo) {
      if (title !== undefined) todo.title = title;
      if (completed !== undefined) todo.completed = completed;

      console.log(`Updated todo: ${JSON.stringify(todo)}`); 
      res.status(200).json(todo);
  } else {
      console.log(`Todo with ID: ${todoId} not found`); 
      res.status(404).json({
          message: `ID: ${todoId} not found`
      });
  }
});

router.delete("/:taskId", (req, res) => {
  const todoId = parseInt(req.params.taskId, 10);
  const index = todos.findIndex(todo => todo.id === todoId);
  if (index !== -1) {
      todos.splice(index, 1);
      res.status(204).send(); // No content
  } else {
      res.status(404).json({
          message: `ID: ${todoId} not found`
      });
  }
});

module.exports = router;