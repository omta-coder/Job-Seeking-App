import React, { useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from "react-router-dom";
import HowItWorks from './HowItWorks';
import HeroSection from './HeroSection';

const Home = () => {
  const {isAuthorized} = useContext(Context)
  if(!isAuthorized){
    return <Navigate to={"/login"}/>
  }
  return (
    <>
     <section className="homePage page">
      <HeroSection/>
      <HowItWorks/>
     </section>
    </>
  )
}

export default Home