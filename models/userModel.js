import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name!"],
        minLangth:[3,"Name must be contain at least 3 Characters!"],
        maxLength: [30, "Name cannot exceed 30 Characters!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email!"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
        minLength: [6, "Password must be at least 6 characters!"],
        maxLength: [30, "Password cannot exceed 30 Characters!"],
    },
    phone:{
        type:Number,
        required:[true,"Please enter your phone number!"],
    },
    role:{
        type:String,
        required:[true,"Please select a role!"],
        enum:["Job Seeker","Employer"],
    }
},{timestamps:true})

//hashed password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10);
})

//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//generating jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

export const User = mongoose.model("User",userSchema);