const express = require("express");
const app = express();

const todosRoutes = require("./api/routes/todos");

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded request bodies

app.use(("/todos"), todosRoutes);

// Error handling middleware
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

module.exports = app;