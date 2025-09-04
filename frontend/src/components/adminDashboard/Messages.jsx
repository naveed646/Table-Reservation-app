import React, { useEffect, useState } from "react";
import { fetchContactMessages } from "../../api/contact";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchContactMessages().then((res) => setMessages(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">User Messages</h1>

      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold">
                {msg.name} ({msg.email})
              </h2>
              <p className="mt-2">{msg.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
