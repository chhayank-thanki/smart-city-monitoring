import { useState } from "react";

const ReportIssueButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', location: '', description: '' });
  const [message, setMessage] = useState("");

  const handleToggle = () => setShowForm(!showForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      console.log("Fetching from:", `${baseUrl}/report`);
      const response = await fetch(`${baseUrl}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setMessage(data.message || "Issue reported successfully!");
      setForm({ name: '', email: '', location: '', description: '' });
      setShowForm(false); // Hide form after submit (optional)
    } catch (error) {
      console.error("Error reporting issue:", error);
      setMessage("Failed to report issue");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <button
        onClick={handleToggle}
        className="fixed right-80  bg-red-600 text-white px-4 py-2 rounded mb-4"
      >
        Report Issue
      </button>

      {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-3 bg-white shadow p-4 rounded">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="w-full p-2 border rounded" />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email" required className="w-full p-2 border rounded" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required className="w-full p-2 border rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the issue..." required className="w-full p-2 border rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ReportIssueButton;
