import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { errorMiddleware } from "../middlewares/error.js";
import { Job } from "../models/jobModel.js";

export const getAllJobs = catchAsyncError(async(req,res,next)=>{
    const jobs = await Job.find({expired:false});
    res.status(200).json({
        success:true,
        message:"Get All Jobs",
        jobs
    })
})