import express from 'express'
import { getAllJobs, getMyJobs, postJob, updateJob } from '../controllers/jobController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router()

router.get("/getall",getAllJobs);
router.post("/postjob",isAuthenticated,postJob);
router.get("/getmyjobs",isAuthenticated,getMyJobs);
router.put("/update/:id",isAuthenticated,updateJob);

export default router;