const express = require('express')
const userRouter = express.Router();
const {
   registerUser,
   loginUser,
   profileUser
} = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get('/profile', authMiddleware, profileUser);

module.exports = userRouter;