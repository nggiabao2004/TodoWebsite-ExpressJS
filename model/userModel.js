const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: [true, "Vui long nhap email"]
      },
      password: {
         type: String,
         required: [true, "Vui long nhap mat khau"]
      }
   }
)

module.exports = mongoose.model('User', userSchema);