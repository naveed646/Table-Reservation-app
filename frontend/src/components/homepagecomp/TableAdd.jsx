import React from 'react'
import { NavLink } from 'react-router-dom'
function TableAdd() {
  return (
    <>
     {/* book table.... */}
      <section className="py-20 px-6 w-[60%] rounded-3xl mx-auto bg-gray-50 shadow-md  mt-4 mb-4 border-gray-800 text-black text-center">
        <h2 className="text-3xl font-bold mb-4">Hungry Yet?</h2>
        <p className="mb-6">
          Reserve your table now and savor the flavors of "Piece on Plate"
        </p>
        <NavLink to="/login" className="bg-black cursor-pointer text-white font-semibold px-6 py-3 rounded-xl hover:bg-zinc-600 transition">
          Book a Table
        </NavLink>
      </section>
      
    </>
  )
}

export default TableAdd