import React from "react";
import {NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import registerImg from "../../assets/registerImg.jpg";
import { useNavigate } from "react-router-dom";



function Signup() {
  const navigate= useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    navigate('/register');
    
  };

  return (
    <div className="flex items-center justify-between min-h-screen bg-gradient-to-tr from-zinc-800 to-pink-200">
      <div
        className="h-screen w-full bg-cover bg-center rounded-r-2xl flex items-center justify-center"
        style={{ backgroundImage: `url(${registerImg})` }}
      >
        <div className="text-black text-center max-w-xl bg-gradient-to-tr from-zinc-800 to-green-200 opacity-90 p-6 rounded">
          <h1 className="font-bold text-3xl mb-4">קเєςє ๏ภ קlคtє</h1>
          <p className="font-semibold">
            At Piece on Plate, we believe food is more than just nourishment —
            it's an experience. Our restaurant blends comforting flavors with
            creative presentation, offering a curated menu of dishes crafted
            from fresh, locally sourced ingredients. Whether you're here for a
            casual meal or a special occasion, we serve every plate with
            passion, style, and a pinch of perfection. Indulge in a dining
            journey where every piece on your plate is a piece of art.
          </p>
        </div>
      </div>

      
      <div className="bg-gradient-to-tr from-zinc-900 to-cyan-600 text-white p-6 mr-10 ml-10 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-center mb-6">Sign Up</h1>

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
              <span className="text-red-400 text-sm">
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
              <span className="text-red-400 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-base font-medium">Password</label>
            <input
              type="password"
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
              <span className="text-red-400 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-orange-500 cursor-pointer text-white font-semibold mx-20 py-4 rounded-full hover:bg-orange-800 transition"
          >
            Sign Up
          </button>

          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-300 underline">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
