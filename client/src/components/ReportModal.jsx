import React, { useState } from "react";
import { submitIssueReport } from "../api";

const ReportModal = ({ onClose }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { description };
      const res = await submitIssueReport(data);
      console.log("Report submitted:", res);
      onClose();
    } catch (err) {
      console.error("Error reporting issue:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form className="bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold mb-2">Report an Issue</h2>
        <textarea
          className="w-full p-2 border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue..."
          required
        />
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReportModal;
