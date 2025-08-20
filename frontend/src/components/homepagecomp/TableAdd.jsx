import React from 'react'

function TableAdd() {
  return (
    <>
     {/* book table.... */}
      <section className="py-20 px-6 bg-orange-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Hungry Yet?</h2>
        <p className="mb-6">
          Reserve your table now and savor the flavors of "Piece on Plate"
        </p>
        <button className="bg-white cursor-pointer text-orange-500 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
          Book a Table
        </button>
      </section>
    </>
  )
}

export default TableAdd