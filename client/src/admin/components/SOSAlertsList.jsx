import React from "react";

const SOSAlertsList = () => {
  const alerts = [
    {
      id: 1,
      name: "Fire at Market Street",
      location: "Market Street, Ahmedabad",
      date: "2025-08-07",
    },
    {
      id: 2,
      name: "Road Accident near LJIET",
      location: "Sarkhej-Gandhinagar Highway, Ahmedabad",
      date: "2025-08-06",
    },
    {
      id: 3,
      name: "Flood Warning in Gota",
      location: "Gota, Ahmedabad",
      date: "2025-08-05",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">SOS Alerts</h2>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Location</th>
              <th className="px-4 py-2 text-left text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{alert.name}</td>
                <td className="px-4 py-2">{alert.location}</td>
                <td className="px-4 py-2">{alert.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SOSAlertsList;
