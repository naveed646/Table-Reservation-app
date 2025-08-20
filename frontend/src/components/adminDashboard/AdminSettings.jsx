import React, { useState } from "react";

export default function AdminSettings() {
  const [formData, setFormData] = useState({
    adminName: "John Doe",
    email: "admin@restaurant.com",
    restaurantName: "The Gourmet Place",
    restaurantLocation: "Downtown, City",
    restaurantPhone: "+123456789",
    openingTime: "09:00",
    closingTime: "22:00",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully");
    console.log("Updated Settings:", formData);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Admin Profile */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Profile Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              placeholder="Admin Name"
              className="p-2 border rounded-md w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 border rounded-md w-full"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password"
              className="p-2 border rounded-md w-full col-span-2"
            />
          </div>
        </div>

        {/* Restaurant Details */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Restaurant Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              placeholder="Restaurant Name"
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="restaurantLocation"
              value={formData.restaurantLocation}
              onChange={handleChange}
              placeholder="Location"
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="restaurantPhone"
              value={formData.restaurantPhone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-2 border rounded-md w-full col-span-2"
            />
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              Opening Time
              <input
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
                className="p-2 border rounded-md w-full"
              />
            </label>
            <label className="flex flex-col">
              Closing Time
              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
                className="p-2 border rounded-md w-full"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
