import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { verifyOtp } from "../../api/auth";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // passed from register page

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(email, otp);
      Swal.fire({
        title: "Email verified! You can login now.",
        icon: "success",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: error.message || "Invalid OTP",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4">Verify OTP</h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter the OTP sent to <b>{email}</b>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="px-3 py-2 border rounded-md text-black"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-lg hover:bg-zinc-700"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
