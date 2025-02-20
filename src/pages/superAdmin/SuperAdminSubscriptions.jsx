import React, { useState } from "react";
import { z } from "zod";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Validation schema (without attachment)
const schema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const SuperAdminSubscriptions = () => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseType, setResponseType] = useState(null); // "success" or "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    const formData = { subject, message };
    const validation = schema.safeParse(formData);
    
    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setErrors({}); // Clear errors if validation passes
    setResponseMessage(null); // Clear previous messages

    try {
      const response = await fetch(`${BASE_URL}/super-admin/send-to-subscribed-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage(result.message || "Broadcast sent successfully!");
        setResponseType("success");
        setSubject(""); // Clear form fields
        setMessage("");
      } else {
        setResponseMessage(result.message || "Failed to send broadcast.");
        setResponseType("error");
      }
    } catch (error) {
      setResponseMessage("An error occurred while sending the broadcast.");
      setResponseType("error");
      console.error("Error sending broadcast:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Broadcast Message</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Subject:</label>
          <input
            type="text"
            className="w-full border rounded-md p-2 mt-1"
            placeholder="Enter subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Message:</label>
          <textarea
            className="w-full border rounded-md p-2 mt-1"
            rows="4"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Send Broadcast
        </button>

        {/* Success/Error Message Below Button */}
        {responseMessage && (
          <p className={`mt-2 text-sm text-center ${responseType === "success" ? "text-green-600" : "text-red-600"}`}>
            {responseMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default SuperAdminSubscriptions;
