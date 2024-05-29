import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobModel.js";

export const getAllJobs = catchAsyncError(async(req,res,next)=>{
    const jobs = await Job.find({expired:false});
    res.status(200).json({
        success:true,
        message:"Get All Jobs",
        jobs
    })
})

export const postJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker not allowed to access this resource",400))
    };
    const{title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo}=req.body
    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler("Please fill all the fields",400))
    }
    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler("Please either provide fixed salary or ranged salary.",400))
    }
    if(salaryFrom && salaryTo && fixedSalary){
        return next(new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400))
    }
    const postedBy = req.user._id;
    const job = await Job.create({title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,postedBy});
    res.status(201).json({
        success:true,
        message:"Job created Successfully!",
        job
    })
})

export const getMyJobs = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker not allowed to access this resource",400))
    };
    const myjobs = await Job.find({postedBy:req.user._id});
    res.status(200).json({
        success:true,
        message:"Get My Jobs",
        myjobs
    })
})

export const updateJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker not allowed to access this resource",400))
    };
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Job not found",404));
    }
    job = await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        message:"Job Updated Successfully!",
    })
})