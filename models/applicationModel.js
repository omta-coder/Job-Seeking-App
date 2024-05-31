import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name!"],
        minLength:[3,"Name must contain at least 3 Characters!"],
        maxLength:[30,"Name must contain at most 30 Characters!"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email!"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email!"]
    },
    coverLetter:{
        type:String,
        required:[true,"Please Provide a Cover Letter!"],
    },
    phone:{
        type:String,
        required:[true,"Please Enter Your Phone Number!"],
    },
    address:{
        type:String,
        required:[true,"Please Enter Your Address!"],
    },
    resume:{
        public_id:{
            type:String,
            required:[true,"Please Enter Your Resume Public ID!"],
        },
        url:{
            type:String,
            required:[true,"Please Enter Your Resume URL!"],
        }
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required:true
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            enum:["Employer"],
            required:true
        }
    }
},{timestamps:true});

export const Application = mongoose.model("Application",applicationSchema);