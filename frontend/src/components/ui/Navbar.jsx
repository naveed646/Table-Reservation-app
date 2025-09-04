import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { data } from "./data/navIte.json";
import logo from "../../assets/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="lg:w-[80%] md:w-[full] mx-auto border-b rounded-xl mt-2 mb-2 shadow-amber-50 border-gray-500  bg-gray-50 text-black">
      <nav className="max-w-6xl   px-4 py-2 flex items-center justify-between">
        {/* logoo.... */}
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate("/")}
            className="h-12 cursor-pointer object-fill w-auto rounded-full"
            src={logo}
            alt="logo"
          />
          <h1 onClick={() => navigate("/")} className="text-black  lg:block md:hidden cursor-pointer text-lg md:text-xl font-bold">
            קเєςє ๏ภ קlคtє
          </h1>
        </div>
        {/* navbar links.... */}
        <ul className="hidden md:flex  gap-8 lg:gap-5 font-semibold text-black">
          {data.navbarLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.link}
                className={({ isActive }) =>
                  `hover:underline underline-offset-4 ${
                    isActive ? "text-zinc-500" : ""
                  }`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Buttons...... */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2.5 bg-black rounded-md w-25 text-white cursor-pointer hover:bg-zinc-700 font-semibold"
          >
            SignUp
          </button>
          <button  onClick={() => navigate("/login")} 
          className="px-6 py-2.5 font-semibold text-white cursor-pointer w-25 bg-black rounded-md hover:bg-zinc-600">
            Login
          </button>
        </div>

        {/* mobile-menu... */}
        <div className="md:hidden lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black text-2xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden lg:hidden px-6 pb-6">
          <ul className="flex flex-col gap-4 font-semibold text-black">
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
              className="w-full px-4 py-2  text-white bg-black rounded"
            >
              Sign up
            </button>
            <button onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
            className="w-full px-4 py-2 bg-black text-white rounded hover:bg-orange-600 transition">
              Login
            </button>
          </div>
        </div>
      )}

      

      
    </div>
  );
}

export default Navbar;
