import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js';
import { employerGetAllApplications, jobseekerDeleteApplication, jobseekerGetAllApplications } from '../controllers/applicationController.js';


const router = express.Router();

router.get("/employer/getall",isAuthenticated,employerGetAllApplications);
router.get("/jobseeker/getall",isAuthenticated,jobseekerGetAllApplications);
router.delete("/delete/:id",isAuthenticated,jobseekerDeleteApplication);


export default router;