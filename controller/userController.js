const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
   try{
      const {email, password} = req.body;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if(!emailRegex.test(email)){
         res.status(400);
         throw new Error("Email khong hop le");
      }

      const isMatch = await User.findOne({email});
      if(isMatch){
         res.status(400);
         throw new Error("Da co Tai khoan voi Email nay");
      }else{
         const hash = await bcrypt.hash(password, 10);
         const newUser = await User.create({email, password: hash});
         res.status(201).json({
            msg: "Dang ky Thanh cong",
            user: {
               id: newUser._id,
               email: newUser.email
            }
         });
      }
   } catch (err){
      res.status(400).json({error: err.message});
   }
});

const loginUser = asyncHandler(async (req, res) => {
   try{
      const {email, password} = req.body;
      const loginUser = await User.findOne({email});
      if (!loginUser){
         res.status(400);
         throw new Error('Tai khoan Email khong ton tai');
      }
      const isMatch = await bcrypt.compare(password, loginUser.password);
      if (!isMatch){
         res.status(400);
         throw new Error("Mat khau Khong dung");
      }

      const token = jwt.sign({id: loginUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
      res.status(200).json({msg: "Dang nhap Thanh cong", token})
   }catch(err){
      res.status(400).json({error: err.message});
   }
})

const profileUser = (req, res) => {
   res.json({user: req.user});
}

module.exports = {
   registerUser,
   loginUser,
   profileUser
}