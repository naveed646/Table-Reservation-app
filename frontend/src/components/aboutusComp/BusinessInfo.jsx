import {FaClock, FaMapMarkerAlt, FaPhone} from "react-icons/fa";

// Business Info
export default function BusinessInfo() {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-white py-10 px-6 grid md:grid-cols-3 gap-6 text-center shadow-md">
      <div>
        <FaClock className="mx-auto text-4xl text-orange-500 mb-3" />
        <h3 className="font-bold text-lg">Opening Hours</h3>
        <p className="text-gray-600">Mon – Sun: 11:00 AM – 11:00 PM</p>
      </div>
      <div>
        <FaMapMarkerAlt className="mx-auto text-4xl text-green-500 mb-3" />
        <h3 className="font-bold text-lg">Our Location</h3>
        <p className="text-gray-600">123 Main Street, Karachi</p>
      </div>
      <div>
        <FaPhone className="mx-auto text-4xl text-blue-500 mb-3" />
        <h3 className="font-bold text-lg">Contact Us</h3>
        <p className="text-gray-600">+92 300 1234567</p>
      </div>
    </div>
  );
}