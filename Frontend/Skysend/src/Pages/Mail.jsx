import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { authState, authToken } from "../atoms/AppAtoms";
import { useNavigate } from "react-router-dom";

export default function MailForm() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, SetToken] = useRecoilState(authToken);
  const [auth, Setauth] = useRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === false) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("to", to);
      formData.append("subject", subject);
      formData.append("message", message);
      if (file) {
        formData.append("file", file);
      }

      const url = file
        ? "http://localhost:5000/api/mail/send/attachment"
        : "http://localhost:5000/api/mail/send";

      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Mail sent successfully!");
      setMessage("");
      setSubject("");
      setTo("");
      setFile(null);
    } catch (error) {
      setError("Failed to send mail. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Send Mail
        </h1>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        {success && (
          <div className="mb-4 text-green-600 text-sm">{success}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="to"
              className="block text-lg font-semibold text-gray-700"
            >
              To
            </label>
            <input
              id="to"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter recipient's email"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-lg font-semibold text-gray-700"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter subject"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-semibold text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your message"
            />
          </div>
          <div>
            <label
              htmlFor="file"
              className="block text-lg font-semibold text-gray-700"
            >
              Attach File (Optional)
            </label>
            <input
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white text-lg font-bold py-3 rounded-lg shadow-md transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              loading ? "bg-blue-400 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Mail"}
          </button>
        </form>
      </div>
    </div>
  );
}
