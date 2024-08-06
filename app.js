const express = require("express");
const app = express();

const todosRoutes = require("./api/routes/todos");

app.use(("/todos"), todosRoutes);

module.exports = app;