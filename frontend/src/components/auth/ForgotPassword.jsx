import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { forgotPassword } from "../../api/auth"; 
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await forgotPassword({ email: data.email });

      Swal.fire({
        title: "OTP Sent 📧",
        text: res.data.message,
        icon: "success",
      });

      // Navigate to reset page with email in query string
      navigate(`/reset-password?email=${data.email}`);
    } catch (err) {
      Swal.fire({
        title: "Error",
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
          Forgot Password
        </h2>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
