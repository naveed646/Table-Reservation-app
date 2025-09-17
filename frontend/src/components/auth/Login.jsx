import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import loginImg from "../../assets/loginImg.jpg";
import { loginUser } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/auth/authSlice";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    try {
      const res = await loginUser(data);
      Swal.fire({
        title: "Login success",
        icon: "success",
        draggable: true,
      });
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: res._id,
            name: res.name,
            email: res.email,
            role: res.role,
            profilePicture: res.profilePicture,
          })
        );

        dispatch(
          setUser({
            _id: res._id,
            name: res.name,
            email: res.email,
            role: res.role,
            profilePicture: res.profilePicture,
          })
        );

        if (res.role === "admin") {
          navigate("/adminDashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      Swal.fire({
        title: "Login failed...",
        icon: "error",
        draggable: false,
      });
      console.error("Login Error:", err);
      setServerError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Left Image Section */}
      <div
        className="h-64 sm:h-80 lg:h-screen w-full lg:w-1/2 bg-cover bg-center rounded-none lg:rounded-r-xl flex items-center justify-center"
        style={{ backgroundImage: `url(${loginImg})` }}
      >
        <div className="text-black text-center max-w-xl bg-gray-200 opacity-90 p-4 sm:p-6 rounded">
          <h1 className="font-bold text-2xl sm:text-3xl mb-4">
            קเєςє ๏ภ קlคtє
          </h1>
          <p className="font-medium text-sm sm:text-base">
            At Piece on Plate, we believe food is more than just nourishment —
            it's an experience. Our restaurant blends comforting flavors with
            creative presentation, offering a curated menu of dishes crafted
            from fresh, locally sourced ingredients. Whether you're here for a
            casual meal or a special occasion, we serve every plate with
            passion, style, and a pinch of perfection.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="bg-gray-200 text-black p-4 sm:p-6 lg:p-6 rounded-xl shadow-lg w-full max-w-sm">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
            Login
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
                placeholder="********"
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

            {serverError && (
              <p className="text-red-600 text-center text-sm">{serverError}</p>
            )}
            <p className="text-sm text-center mt-2">
              <NavLink
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </NavLink>
            </p>

            <button
              type="submit"
              disabled={loading}
              className=" bg-black cursor-pointer w-[30%] mx-auto text-white font-semibold py-3 rounded-xl hover:bg-zinc-600 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-sm text-center mt-2">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="bg-black hover:bg-zinc-600 text-white p-1 rounded-md"
              >
                SignUp
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
