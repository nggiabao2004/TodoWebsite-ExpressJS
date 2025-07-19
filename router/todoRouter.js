const express = require('express');
const todoRouter = express.Router();
const {
   getListTodo,
   createTodo,
   getTodoById,
   updateTodo,
   deleteTodo
} = require('../controller/todoController');
const authMiddleware = require('../middleware/authMiddleware');

todoRouter.route('/')
   .get(authMiddleware, getListTodo)
   .post(authMiddleware, createTodo)

todoRouter.route("/:id")
   .get(authMiddleware, getTodoById)
   .put(authMiddleware, updateTodo)
   .delete(authMiddleware, deleteTodo)

module.exports = todoRouter;