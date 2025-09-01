import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMenu } from "../../api/menu";

function MenuItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getMenu(1, 1000);
        const found = data.items.find((m) => m._id === id);
        setItem(found || null);
      } catch (err) {
        setError(err.message || "Failed to load item");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!item) return <p className="text-center py-10">Item not found</p>;

  return (
    <section className="py-10 px-6 bg-white">
      {/* Flex container with image on LEFT and details on RIGHT */}
      <div className="max-w-4xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* LEFT SIDE - IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src={`http://localhost:8000${item.imageUrl}`}
            alt={item.title}
            className="rounded-md w-full max-w-md h-auto object-contain"
          />
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="flex-1 text-left">
          <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
          <p className="text-gray-600 mb-6">{item.description}</p>
          <p className="text-gray-900 text-2xl font-semibold mb-6">
            Rs.{item.price}
          </p>
          <div className="flex gap-4">
            <Link
              to="/menuitmes"
              className="text-white bg-black p-2 rounded-xl hover:bg-zinc-600 mb-6 inline-block"
            >
              ← Back to Menu
            </Link>
          </div>
          {/* <div className="flex gap-4">
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-zinc-700">
              Add to Cart
            </button>
            <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600">
              Buy Now
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default MenuItemDetail;
