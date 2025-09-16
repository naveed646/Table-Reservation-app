import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveContactInfo } from "../../redux/contactInfo/contactInfoSlice";

export default function ContactInfo() {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.contactInfo.info);

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    location: "",
    openingHours: "",
  });

  useEffect(() => {
    if (info) setFormData(info);
  }, [info]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveContactInfo(formData));
    alert("✅ Contact info updated!");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Your Contacts Information</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col space-y-4">
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-3 border rounded" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 border rounded" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full p-3 border rounded" />
        <input name="openingHours" value={formData.openingHours} onChange={handleChange} placeholder="Opening Hours" className="w-full p-3 border rounded" />
        <button type="submit" className="bg-black hover:bg-zinc-600 cursor-pointer w-[20%] mx-auto text-white py-2 px-4 rounded">Save</button>
      </form>
    </div>
  );
}
