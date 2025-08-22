import React, { useState } from "react";
import SOSAlertsList from "./components/SOSAlertsList";
import SOSMap from "./components/SOSMap";
import CreateAlertForm from "./components/CreateAlertForm";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("sos");

  const renderTab = () => {
    switch (activeTab) {
      case "sos":
        return <SOSAlertsList />;
      case "map":
        return <SOSMap />;
      case "create":
        return <CreateAlertForm />;
      default:
        return <SOSAlertsList />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left ${
                activeTab === "sos" ? "font-bold text-yellow-300" : ""
              }`}
              onClick={() => setActiveTab("sos")}
            >
              View SOS Alerts
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left ${
                activeTab === "map" ? "font-bold text-yellow-300" : ""
              }`}
              onClick={() => setActiveTab("map")}
            >
              SOS Alerts Map
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left ${
                activeTab === "create" ? "font-bold text-yellow-300" : ""
              }`}
              onClick={() => setActiveTab("create")}
            >
              Create Alert
            </button>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">{renderTab()}</div>
    </div>
  );
};

export default AdminDashboard;
