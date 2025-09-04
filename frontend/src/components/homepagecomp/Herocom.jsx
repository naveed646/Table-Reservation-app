import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import homeHero from "../../assets/homeHero.jpg"
function Herocom() {
  return (
     <>
      {/* heroo sec..... */}
      <section className=" bg-cover bg-center  h-[90vh] flex items-center justify-center"
       style={{ backgroundImage: `url(${homeHero})` }}
      >
        <div className="bg-white bg-opacity-60 p-10 rounded-xl text-center opacity-85 text-black max-w-xl">
          <h1 className="text-5xl font-bold mb-4">קเєςє ๏ภ קlคtє</h1>
          <p className="text-lg mb-6">
            Where every piece tells a story of flavor, freshness, and love.
          </p>
          <NavLink to="/menuitmes" className="bg-black text-gray-50 shadow-2xl hover:bg-zinc-600 transition px-6 py-3 w-[37%] mx-auto rounded-xl font-semibold flex items-center justify-center ">
            Explore Menu <FaArrowRight className="ml-2" />
          </NavLink>
        </div>
      </section>
     </>
  )
}

export default Herocom