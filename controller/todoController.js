const asyncHandler = require('express-async-handler');
const Todo = require('../model/todoModel');

const getListTodo = asyncHandler(async (req, res) => {
   const listTodo = await Todo.find({user: req.user.id});
   res.status(200).json(listTodo);
});

const createTodo = asyncHandler(async (req, res) => {
   const {title, description} = req.body;
   if(!title){
      res.status(400);
      throw new Error("Vui long nhap tieu de cua cong viec");
   }
   const newTodo = await Todo.create({
      title,
      description,
      completed: false,
      user: req.user.id
   });
   res.status(201).json(newTodo);
});

const getTodoById = asyncHandler(async (req, res) => {
   const todoById = await Todo.findById(req.params.id);
   if(!todoById || todoById.user.toString() !== req.user.id){
      res.status(404);
      throw new Error("Khong tim thay Todo can tim")
   }
   res.status(200).json(todoById);
})

const updateTodo = asyncHandler(async (req, res) => {
   const todoById = await Todo.findById(req.params.id);
   if(!todoById || todoById.user.toString() !== req.user.id){
      res.status(404);
      throw new Error("Khong tim thay Todo can tim");
   }
   const updateTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
   )
   res.status(200).json(updateTodo);
});

const deleteTodo = asyncHandler(async (req, res) => {
   const todoById = await Todo.findById(req.params.id);
   if(!todoById || todoById.user.toString() !== req.user.id){
      res.status(404);
      throw new Error("Khong tim thay Todo can tim");
   }
   await todoById.deleteOne({_id: req.params.id});
   res.status(200).json(todoById);
});

module.exports = {
   getListTodo,
   createTodo,
   getTodoById,
   updateTodo,
   deleteTodo
}