import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import registerImg from "../../assets/registerImg.jpg";
import { registerUser } from "../../api/auth";
import { FaEyeSlash, FaEye } from "react-icons/fa";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      const response = await registerUser(data);
      alert(" Registration successful!");
      console.log("API Response:", response);

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert(` Registration failed: ${error.message || "Try again"}`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Left Image Section */}
      <div
        className="h-64 sm:h-80 lg:h-screen w-full lg:w-1/2 bg-cover bg-center rounded-none lg:rounded-r-2xl flex items-center justify-center"
        style={{ backgroundImage: `url(${registerImg})` }}
      >
        <div className="text-black text-center max-w-xl bg-gray-200 opacity-90 p-4 sm:p-6 rounded">
          <h1 className="font-bold text-2xl sm:text-3xl mb-4">קเєςє ๏ภ קlคtє</h1>
          <p className="font-medium text-sm sm:text-base">
            At Piece on Plate, we believe food is more than just nourishment —
            it's an experience. Our restaurant blends comforting flavors with
            creative presentation, offering a curated menu of dishes crafted
            from fresh, locally sourced ingredients.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="bg-gray-200 text-black p-4 sm:p-6 lg:p-6 rounded-xl shadow-lg w-full max-w-sm">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
            Sign Up
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-base font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name..."
                className="text-lg px-3 py-2 border-b border-gray-400 focus:outline-none text-black"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-600 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-base font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email..."
                className="text-lg px-3 py-2 border-b border-gray-400 focus:outline-none text-black"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="relative flex flex-col">
              <label className="text-base font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password..."
                className="text-lg px-3 py-2 border-b border-gray-400 focus:outline-none text-black"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message}
                </span>
              )}
              <span
                className="absolute right-3 top-11.5 transform -translate-y-1/2 cursor-pointer text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="bg-black cursor-pointer text-white font-semibold py-3 rounded-xl hover:bg-zinc-600 transition w-[30%] mx-auto"
            >
              Sign Up
            </button>

            <p className="text-sm text-center mt-2">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="bg-black text-white p-1 hover:bg-zinc-600 cursor-pointer rounded-md"
              >
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
