import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const signup=async (req,res,next)=>{
  //console.log(req.body);
  // res.json(req.body);
  const {username,email,password}=req.body;
   // res.json({username,email,password});
    if(req.body.password){
      if(req.body.password.length < 6  ){
        return next(errorHandler(400, 'Password atleasst 6 charecter'));
      }
    }
    if(req.body.username){
      if(req.body.username.length < 4 || req.body.username.length > 15){
        return next(errorHandler(400, 'User name between length of 4 and 25 charecters'));
      }
      if(req.body.username !== req.body.username.toLowerCase()){
        return next(errorHandler(400, "User name must be in lowe charecters"));
      }
      if(req.body.username.includes(' ')){
        next(errorHandler(400, "Username can't contain spaces"))
      }
      if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return next(errorHandler(401, 'user name can only contains letters and numbers'))
      }
    }



  if(!username || !email || !password || username==='' || email==='' || password===''){
next(errorHandler(400,'All fields are required!'));  }
  const hashedPassword=bcryptjs.hashSync(password,10);
  const newUser=new User({
    username,
    email,
    password:hashedPassword,
  });
  try{
    await newUser.save();
    res.json({message:" succesfully!"})
  }catch(error){
next(error);  }
 
};
export const signin=async(req,res,next)=>{
  const {email,password}=req.body;
  if(!email || !password || email==='' || password===''){
   return next(errorHandler(400,'All fields are requred'));
  }
  try{
    const validUser=await User.findOne({email})
    if(!validUser){
    return  next(errorHandler(400,"UserNotFound"))
    }
    const validPassword=bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
     return next(errorHandler(400,'Invalid password'));
    }
const token=jwt.sign({id:validUser._id, isAdmin: validUser.isAdmin},process.env.JWT_SECRET)
const {password: pass, ...rest}=validUser._doc;
res.status(200)
  .cookie('access_token',token,{
    httpOnly:true,
  }).json(rest);
  }catch(error){
    next(error);
  }
};

export const google=async(req,res,next)=>{
  const{email,name,googlePhotoUrl}=req.body;
  try{
    const user=await User.findOne({email});
    if(user){
      const token=jwt.sign({id:user._id , isAdmin: user.isAdmin },process.env.JWT_SECRET);
      const {password , ...rest}=user._doc;
      res.status(200).cookie('access_token',token,{
        httpOnly:true,  }).json(rest);

    }
    else{
      const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
 const newUser =new User({
  username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
  email,
  password:hashedPassword,
  profilePicture:googlePhotoUrl,
});
//console.log(newUser.profilePicture);
await newUser.save();
const token=jwt.sign({id:newUser._id, isAdmin: newUser.isAdmin},process.env.JWT_SECRET);
const {password ,... rest}=newUser._doc;
res.status(200).cookie('access_token',token,{
  httpOnly:true,

}).json(rest);
    }


  }catch(error){
    console.log("catched Error!");
    next(error);
  }
}

