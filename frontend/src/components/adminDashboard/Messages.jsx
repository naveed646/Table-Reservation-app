import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { LuRefreshCw } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import {
  fetchContactMessages,
  deleteMessage,
  clearAllMessages,
} from "../../api/contact";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);      // for load / clear all
  const [deletingId, setDeletingId] = useState(null); // track single delete

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await fetchContactMessages();
      setMessages(res.data || []);
    } catch (err) {
      console.error("Failed to load messages:", err);
      Swal.fire("Error", "Failed to load messages", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    const result = await Swal.fire({
      title: "Delete message?",
      text: "This message will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      Swal.fire("Deleted!", "Message has been deleted.", "success");
    } catch (err) {
      console.error("Error deleting message:", err);
      Swal.fire("Error", "Failed to delete message.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    const result = await Swal.fire({
      title: "Clear all messages?",
      text: "This will permanently delete ALL messages.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear all",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      await clearAllMessages();
      setMessages([]);
      Swal.fire("Cleared!", "All messages have been deleted.", "success");
    } catch (err) {
      console.error("Error clearing messages:", err);
      Swal.fire("Error", "Failed to clear messages.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User Messages "{messages.length}"</h1>

        <div className="flex gap-2">
          <button
            onClick={loadMessages}
            className="px-4 py-2 bg-gray-100 cursor-pointer text-black rounded-lg shadow hover:bg-zinc-200"
            disabled={loading}
          >
            <LuRefreshCw />
          </button>

          {messages.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-black cursor-pointer text-white rounded-lg shadow hover:bg-zinc-600"
              disabled={loading}
            >
              {loading ? "Clearing..." : "Clear All"}
            </button>
          )}
        </div>
      </div>

      {messages.length === 0 ? (
        <p>{loading ? "Loading messages..." : "No messages yet."}</p>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white p-6 rounded-lg shadow flex justify-between items-start"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {msg.name}{" "}
                  <span className="text-sm text-gray-500">({msg.email})</span>
                </h2>
                <p className="mt-2">{msg.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="ml-4 flex flex-col gap-2">
                <button
                  onClick={() => handleDeleteMessage(msg._id)}
                  className="px-3 py-1 text-black text-2xl cursor-pointer rounded disabled:opacity-50"
                  disabled={deletingId === msg._1d}
                >
                  {deletingId === msg._id ? "Deleting..." : <FaTrash/>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
