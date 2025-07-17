const express = require('express');
const todoRouter = express.Router();
const {
   getListTodo,
   createTodo,
   getTodoById,
   updateTodo,
   deleteTodo
} = require('../controller/todoController');

todoRouter.route('/')
   .get(getListTodo)
   .post(createTodo)

todoRouter.route("/:id")
   .get(getTodoById)
   .put(updateTodo)
   .delete(deleteTodo)

module.exports = todoRouter;