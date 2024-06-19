import React from 'react'
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


const App = () => {
  const {isAuthorized,setIsAuthorized,setUser} = useContext(Context)
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App