import React from "react";


import Herocom from "../components/homepagecomp/Herocom";
import MenuItems from "../components/homepagecomp/MenuItems";
import About from "../components/homepagecomp/About";
import TableAdd from "../components/homepagecomp/TableAdd";

export default function HomePage() {
  
  return (
    <div className="font-sans text-gray-800">
      <Herocom/>
      <MenuItems/>   
      <About/> 
      <TableAdd/>
    </div>
  );
}
