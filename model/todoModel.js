const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
   {
      title: {
         type: String,
         required: [true, "Vui long nhap ten todo muon thuc hien"]
      },
      description: {
         type: String,
         required: false
      },
      completed: {
         type: Boolean,
      },
      createdAt: {
         type: Date
      }
   },
   {
      timestamps: true
   }
);

module.exports = mongoose.model('Todo', todoSchema)