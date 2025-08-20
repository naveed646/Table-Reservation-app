import { FaFacebookF, FaInstagram, FaTwitter, FaLocationArrow, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {data} from "./data/navIte.json"

export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">קเєςє ๏ภ קlคtє</h2>
          <p className="text-sm text-gray-400">
            Delight in every bite. Premium quality food made with passion and love.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            { data.navbarLinks.map((item)=>(
              <li className="hover:text-white" key={item.id}>
                <NavLink to={item.link}>
                  {item.title}
                </NavLink>
              </li>
            ))
           
            }
                  
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <FaLocationArrow /> 123 Food Street, Flavor Town
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +1 234 567 890
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> hello@tastybites.com
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-gray-400">
            <NavLink to="#" className="hover:text-white text-xl"><FaFacebookF /></NavLink>
            <NavLink to="#" className="hover:text-white text-xl"><FaInstagram /></NavLink>
            <NavLink to="#" className="hover:text-white text-xl"><FaTwitter /></NavLink>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} קเєςє ๏ภ קlคtє . All rights reserved.
      </div>
    </footer>
  );
}
