import { useState } from "react";

const CreateAlertForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:8000/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ title: "", description: "", type: "", location: "" });
      } else {
        console.error("Error creating alert");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Create New Alert</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type (e.g. Flood, Fire)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Alert
        </button>

        {success && (
          <p className="text-green-600 mt-2">Alert sent successfully!</p>
        )}
      </form>
    </div>
  );
};

export default CreateAlertForm;
