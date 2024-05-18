import express from "express"
import 'dotenv/config'
import cors from 'cors'
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB)
.then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log(error);
})

const app = express();
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT"],
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
}))

export default app;