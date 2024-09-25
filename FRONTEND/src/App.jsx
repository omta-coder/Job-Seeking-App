import React, { useEffect } from 'react'
import './App.css'
import { Context } from './main'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from 'react';
import Home from './component/Home/Home';
import Navbar from './component/Layout/Navbar';
import Footer from './component/Layout/Footer';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import NotFound from './component/NotFound/NotFound';
import MyApplications from './component/Application/MyApplications';
import PostJob from './component/Job/PostJob';
import MyJobs from './component/Job/MyJobs';
import Jobs from './component/Job/Jobs';
import JobDetails from './component/Job/JobDetails';
import Application from './component/Application/Application';
import axios from "axios";
import {Toaster} from "react-hot-toast";


const App = () => {
  const {isAuthorized,setIsAuthorized,setUser} = useContext(Context);

  useEffect(() => {
    const fetchUser = async()=>{
   try {
    const response = await axios.get("http://localhost:4000/api/v1/user/getuser",{withCredentials:true})
    setUser(response.data.user);
    setIsAuthorized(true);
   } catch (error) {
    setIsAuthorized(false);
   }
  }
   fetchUser();
  }, [isAuthorized])
  

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path='/job/getall' element={<Jobs/>}/>
      <Route path='/job/:id' element={<JobDetails/>}/>
      <Route path='/application/:id' element={<Application/>}/>
      <Route path='/application/me' element={<MyApplications/>}/>
      <Route path='/job/post' element={<PostJob/>}/>
      <Route path='/job/me' element={<MyJobs/>}/>
      <Route path="*" element={<NotFound/>} />
    </Routes>
    <Footer/>
    <Toaster/>
    </BrowserRouter>
    </>
  )
}

export default App