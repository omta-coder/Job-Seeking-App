import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async(req,res,next)=>{
    const {name,email,password,phone,role} = req.body;

    if(!name || !email || !password || !phone || !role){
        return next(new ErrorHandler("Please fill all the fields",400));
    }
    const isEmail = await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("Email already exists",400));
    }
    const user = await User.create({name,email,password,phone,role});
    sendToken(user,201,res,"User Registered Successfully!")
})

export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password,role} = req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Please fill all the fields",400));
    }
    const user = await User.findOne({email});
    if(!user){
        return next(new ErrorHandler("Invalid Credentials",401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Credentials",401));
    }
    if(user.role!== role){
        return next(new ErrorHandler("Invalid Credentials",401));
    }
    sendToken(user,200,res,"Login Successfully!")
})
