import { FaFacebookF, FaInstagram, FaTwitter, FaLocationArrow, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {data} from "./data/navIte.json";
import {useSelector} from "react-redux";

export default function Footer() {
  const info = useSelector((state)=> state.contactInfo.info)
  if (!info) {
    return <p>Loading business info...</p>; // or skeleton UI
  }
  return (
    <footer className="bg-white border-t border-gray-800 text-black py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">קเєςє ๏ภ קlคtє</h2>
          <p className="text-sm text-black">
            Delight in every bite. Premium quality food made with passion and love.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-black text-sm">
            { data.navbarLinks.map((item)=>(
              <li className="hover:text-zinc-500" key={item.id}>
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
          <ul className="space-y-2 text-black text-sm">
            <li className="flex items-center gap-2">
              <FaLocationArrow /> {info.location}
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> {info.phone}
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> {info.email}
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-black">
            <NavLink to="#" className="hover:text-zinc-600 text-xl"><FaFacebookF /></NavLink>
            <NavLink to="#" className="hover:text-zinc-600 text-xl"><FaInstagram /></NavLink>
            <NavLink to="#" className="hover:text-zinc-600 text-xl"><FaTwitter /></NavLink>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} קเєςє ๏ภ קlคtє . All rights reserved.
      </div>
    </footer>
  );
}
