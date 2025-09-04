import {FaClock, FaMapMarkerAlt, FaPhone} from "react-icons/fa";
import { useSelector } from "react-redux";


// Business Info
export default function BusinessInfo() {
  const info = useSelector ((state)=> state.contactInfo.info)

  if (!info) {
    return <p>Loading business info...</p>; // or skeleton UI
  }
  return (
    <div className="bg-gray-50 mt-4 mb-4 rounded-2xl w-[80%] mx-auto border-gray-800 py-10 px-6 grid md:grid-cols-3 gap-6 text-center shadow-md">
      <div>
        <FaClock className="mx-auto text-4xl text-black mb-3" />
        <h3 className="font-bold text-lg">Opening Hours</h3>
        <p className="text-gray-600">{info.openingHours}</p>
      </div>
      <div>
        <FaMapMarkerAlt className="mx-auto text-4xl text-black mb-3" />
        <h3 className="font-bold text-lg">Our Location</h3>
        <p className="text-gray-600">{info.location}</p>
      </div>
      <div>
        <FaPhone className="mx-auto text-4xl text-black mb-3" />
        <h3 className="font-bold text-lg">Contact Us</h3>
        <p className="text-gray-600">{info.phone}</p>
      </div>
    </div>
  );
}