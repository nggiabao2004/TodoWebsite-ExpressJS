const express = require('express');
const app= express();
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const errorHandler = require('./middleware/errorHandler');

const todoRouter = require('./router/todoRouter');
const userRouter = require('./router/userRouter');
const port = process.env.MONGO_PORT || 3000;

dbConnect();
app.use(errorHandler);
app.use(express.json());

app.get("/", (req, res) => {
   res.json({ message: "Home Page" });
})

app.use("/api/todo", todoRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
   console.log(`Server is running at port ${port}`);
})
