import React from "react";
import HeroSection from "../components/aboutusComp/HeroSection";
import MainContent from "../components/aboutusComp/MainContent";
import Cards from "../components/aboutusComp/Cards";
import Ratings from "../components/aboutusComp/Ratings";


function AboutUs() {
  return (
    <>
    <div className="min-h-screen w-full  text-black bg-black bg-opacity-80 relative">
      
      <HeroSection/>

      {/* Content of it.. */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 py-20">
        <MainContent/>  
        <Cards/>

       
      </div>
    </div>
    <Ratings/>
    </>
  );
}

export default AboutUs;
