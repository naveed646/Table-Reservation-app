import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-white to-orange-50 py-16 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Contact <span className="text-orange-500">Us</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions, feedback, or want to book a special dining experience?  
          Get in touch with us we’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <FaPhoneAlt className="text-orange-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-600">+92 300 1234567</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <FaEnvelope className="text-orange-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-800">Email Us</h3>
              <p className="text-gray-600">info@pieceonplate.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <FaMapMarkerAlt className="text-orange-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-800">Visit Us</h3>
              <p className="text-gray-600">123 Food Street, Lahore, Pakistan</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <FaClock className="text-orange-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-800">Opening Hours</h3>
              <p className="text-gray-600">Mon - Sun: 12:00 PM - 11:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Send Us a Message
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
