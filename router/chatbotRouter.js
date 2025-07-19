const express = require('express');
const chatbotRouter = express.Router();
const chatbot = require('../controller/chatbotController');
const authMiddleware = require('../middleware/authMiddleware');

chatbotRouter.post('/', authMiddleware, chatbot);

module.exports = chatbotRouter;