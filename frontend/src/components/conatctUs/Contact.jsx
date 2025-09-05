import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { sendContactMessage } from "../../api/contact";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const info = useSelector((state)=> state.contactInfo.info)
  if (!info) return <p className="text-center mt-10">Loading contact info...</p>;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await sendContactMessage(formData);
        Swal.fire({
              title: "Your message has been sent successfully!",
              icon: "success",
              draggable: true,
            });
      // setStatus("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      Swal.fire({
              title: "Something went wrong. Try again.",
              icon: "error",
              draggable: true,
            });
      // setStatus("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Contact <span className="text-black">Us</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions or feedback? We’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md">
            <FaPhoneAlt className="text-black text-2xl" />
            <div>
              <h3 className="font-semibold">Call Us</h3>
              <p>{info.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md">
            <FaEnvelope className="text-black text-2xl" />
            <div>
              <h3 className="font-semibold">Email Us</h3>
              <p>{info.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md">
            <FaMapMarkerAlt className="text-black text-2xl" />
            <div>
              <h3 className="font-semibold">Visit Us</h3>
              <p>{info.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md">
            <FaClock className="text-black text-2xl" />
            <div>
              <h3 className="font-semibold">Opening Hours</h3>
              <p>{info.openingHours}</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 flex flex-col justify-center items-center rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-3 border rounded-lg"
            />
             <button
              type="submit"
              disabled={loading}
              className=" flex  justify-center w-[30%] mx-auto bg-black text-white py-3 mt-5  rounded-lg hover:bg-zinc-600"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
         
          {status && <p className="mt-4 text-center">{status}</p>}
        </div>
      </div>
    </div>
  );
}
