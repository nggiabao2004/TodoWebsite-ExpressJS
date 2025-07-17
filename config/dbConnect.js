const mongoose = require('mongoose');

const dbConnect = async () => {
   try{
      const connect= await mongoose.connect(process.env.MONGO_URI);
      console.log(`Database connected at port ${process.env.MONGO_PORT}`);
   }catch (err){
      console.log(err);
      process.exit(1);
   }
};

module.exports = dbConnect;
