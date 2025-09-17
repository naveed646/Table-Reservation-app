import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { resetPassword } from "../../api/auth"; 
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract email from query string
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get("email");

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: emailFromQuery,
        otp: data.otp,
        newPassword: data.newPassword,
      };

      const res = await resetPassword(payload);

      Swal.fire({
        title: "Password Reset Successful 🎉",
        text: res.data.message,
        icon: "success",
      }).then(() => {
        navigate("/login"); // redirect to login
      });
    } catch (err) {
      Swal.fire({
        title: "Reset Failed",
        text: err.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          Reset Password
        </h2>

        <div className="mb-4">
          <label className="block mb-1">OTP</label>
          <input
            type="text"
            {...register("otp", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            {...register("newPassword", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
