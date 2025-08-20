import React, { useState } from "react";
import { user as initialUser } from "../../data/index";
import { useNavigate } from "react-router-dom";

function UserSettings() {
  const [user, setUser] = useState(initialUser);
  const [newName, setNewName] = useState(user.name);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    setUser({ ...user, name: newName });
    setNewPassword(""); // reset password field
    navigate(-1); // go back to profile
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          User Settings
        </h2>

        {/* Show Info */}
        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Loyalty Points:</strong> {user.loyaltyPoints}
        </p>

        {/* Change Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600">
            Change Name
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-3 py-2 mt-1 rounded-md border focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Change Password */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-600">
            Change Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 mt-1 rounded-md border focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Save Changes
        </button>

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-3 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default UserSettings;
