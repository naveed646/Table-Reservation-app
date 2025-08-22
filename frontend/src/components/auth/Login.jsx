import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import loginImg from "../../assets/loginImg.jpg";
import { loginUser } from "../../api/auth";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    try {
      const res = await loginUser(data);

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: res._id,
            name: res.name,
            email: res.email,
            role: res.role,
          })
        );

        // navigate on role base...
        if (res.role === "admin") {
          navigate("/adminDashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
      setServerError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between min-h-screen bg-gradient-to-tr from-zinc-800 to-orange-200">
      <div
        className="h-screen w-full bg-cover bg-center rounded-r-xl flex items-center justify-center"
        style={{ backgroundImage: `url(${loginImg})` }}
      >
        <div className="text-black text-center max-w-xl bg-gradient-to-tr from-zinc-800 to-orange-200 opacity-90 p-6 rounded">
          <h1 className="font-bold text-3xl mb-4">קเєςє ๏ภ קlคtє</h1>
          <p className="font-semibold">
            At Piece on Plate, we believe food is more than just nourishment —
            it's an experience. Our restaurant blends comforting flavors with
            creative presentation, offering a curated menu of dishes crafted
            from fresh, locally sourced ingredients. Whether you're here for a
            casual meal or a special occasion, we serve every plate with
            passion, style, and a pinch of perfection.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-tr from-zinc-900 to-orange-900 text-white p-6 mr-10 ml-10 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

          {serverError && (
            <p className="text-red-400 text-center text-sm">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 cursor-pointer text-white font-semibold mx-20 py-4 rounded-full hover:bg-orange-800 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center mt-2">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-300 underline">
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
