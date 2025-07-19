const {GoogleGenerativeAI} = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatbot = async (req, res) => {
   try{
      const {message}= req.body;
      //Đổi model AI của Gemini (ví dụ: đang sử dụng model gemini-2.5-flash)
      const model= genAI.getGenerativeModel({model: "gemini-2.5-flash"});
      const result = await model.generateContent(message);
      res.json({reply: result.response.text()});
   }catch (err){
      res.status(500).json({error: err.message});
   }
};

module.exports = chatbot;