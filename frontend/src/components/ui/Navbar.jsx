import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { data } from "./data/navIte.json";
import logo from "../../assets/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full  bg-zinc-800 border-b border-gray-200">
      <nav className="max-w-6xl  px-4 py-2 flex items-center justify-between">
        {/* logoo.... */}
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate("/")}
            className="h-12 cursor-pointer object-fill w-auto rounded-full"
            src={logo}
            alt="logo"
          />
          <h1 className="text-white text-lg md:text-xl font-bold">
            คเєςє ๏ภ קlคtє
          </h1>
        </div>
        {/* navbar links.... */}
        <ul className="hidden md:flex gap-8 font-semibold text-white">
          {data.navbarLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.link}
                className={({ isActive }) =>
                  `hover:underline underline-offset-4 ${
                    isActive ? "text-zinc-400" : ""
                  }`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Buttons...... */}
        <div className="relative left-22 hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2.5 text-white cursor-pointer hover:bg-zinc-700 font-semibold"
          >
            Sign up
          </button>
          <button  onClick={() => navigate("/login")} className="px-6 py-2.5 font-semibold text-white cursor-pointer bg-orange-500 rounded-md hover:shadow-lg transition duration-200">
            Login
          </button>
        </div>

        {/* mobile-menu... */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6">
          <ul className="flex flex-col gap-4 font-semibold text-white">
            {data.navbarLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.link}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block hover:underline underline-offset-4 ${
                      isActive ? "text-zinc-400" : ""
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                navigate("/register");
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-white bg-zinc-700 hover:bg-zinc-600 rounded"
            >
              Sign up
            </button>
            <button className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
