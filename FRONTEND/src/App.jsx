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
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App