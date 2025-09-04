import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMenu } from "../../api/menu";

function MenuItems() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu(1, 1000); // fetch all menu items
        setMenu(data.items || []);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError(err.message || "Failed to load menu items");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) return <p className="text-center py-10">Loading menu...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <section className="py-16 px-6 border-t border-b  border-gray-800 bg-white text-center">
      <h2 className="text-3xl font-bold mb-4">Customer Favorites</h2>
      <p className="text-gray-600 mb-10">
        A taste of what keeps our guests coming back for more
      </p>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
        {menu.length > 0 ? (
          menu.map((item) => (
            <Link key={item._id} to={`/menudetail/${item._id}`}>
              <div className="bg-gray-100 p-6 rounded-lg hover:shadow-2xl transition cursor-pointer">
                <img
                  src={`http://localhost:8000${item.imageUrl}`}
                  alt={item.title}
                  className="rounded-md mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="text-gray-800 font-bold mt-2">Rs.{item.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-3 text-gray-500">No menu items available</p>
        )}
      </div>
    </section>
  );
}

export default MenuItems;
