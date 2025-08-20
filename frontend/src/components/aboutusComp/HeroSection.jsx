import React from "react";
import aboutImg from "../../assets/aboutImg.jpg";

function HeroSection() {
  return (
    <>
      <div
        className="absolute  bg-cover bg-center h-full w-full z-0"
        style={{ backgroundImage: `url(${aboutImg})` }}
      ></div>
      <div className="absolute  bg-black bg-opacity-70 z-10"></div>
    </>
  );
}

export default HeroSection;
