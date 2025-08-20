import React from 'react'
import pasta from '../../assets/pasta.png';
import steak from '../../assets/steak.jpg';
import salad from '../../assets/salad.jpg';
import rice from '../../assets/rice.jpg';
import pizza from '../../assets/pizza.jpg';
import chickenkabab from '../../assets/chickenkabab.jpg';

function MenuItems() {
  return (
   <>
    {/* menu items.. */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Customer Favorites</h2>
        <p className="text-gray-600 mb-10">
          A taste of what keeps our guests coming back for more
        </p>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-lg hover:shadow-2xl transition">
            <img
              src={pasta}
              alt="Pasta"
              className="rounded-md mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Creamy Garlic Pasta</h3>
            <p className="text-gray-500 text-sm">
              Rich, creamy, and full of flavor — the perfect comfort food.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg hover:shadow-xl transition">
            <img
              src={steak}
              alt="Steak"
              className="rounded-md mb-4 w-full h-55 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">
              Grilled Peppercorn Steak
            </h3>
            <p className="text-gray-500 text-sm">
              Juicy cuts grilled to perfection, with bold pepper flavors.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg hover:shadow-xl transition">
            <img
              src={salad}
              alt="Salad"
              className="rounded-md mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">
              Seasonal Garden Salad
            </h3>
            <p className="text-gray-500 text-sm">
              Crisp greens, vibrant veggies, and homemade dressing.
            </p>
          </div>
            <div className="bg-gray-100 p-6 rounded-lg hover:shadow-xl transition">
            <img
              src={rice}
              alt="rice"
              className="rounded-md mb-4 w-full h-85 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">
              Delicious Chicken Rice with juicy Kabab
            </h3>
            <p className="text-gray-500 text-sm">
              Crisp greens, vibrant veggies, and homemade dressing.
            </p>
          </div>
            <div className="bg-gray-100 p-6 rounded-lg hover:shadow-xl transition">
            <img
              src={chickenkabab}
              alt="kabab"
              className="rounded-md mb-4 w-full h-60 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">
              Crispy Chicken Kabab
            </h3>
            <p className="text-gray-500 text-sm">
              Crisp greens, vibrant veggies, and homemade dressing.
            </p>
          </div>
            <div className="bg-gray-100 p-6 rounded-lg hover:shadow-xl transition">
            <img
              src={pizza}
              alt="pizza"
              className="rounded-md mb-4 w-full h-65 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">
              chicken supreme chese crsut stuff Pizza
            </h3>
            <p className="text-gray-500 text-sm">
              Crisp greens, vibrant veggies, and homemade dressing.
            </p>
          </div>
        </div>
      </section>
   </>
  )
}

export default MenuItems