const AlertsPanel = () => {
  const alerts = [
    { id: 1, type: "Water Cut", message: "Water supply disruption in Zone 3 until 5 PM" },
    { id: 2, type: "Fire Alert", message: "Fire reported near Sector 12. Stay safe." },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold mb-2 mt-5">Live Alerts & Warnings</h2>
      <ul className="space-y-2">
        {alerts.map((alert) => (
          <li key={alert.id} className="bg-red-100 border-l-4 border-red-600 p-2 rounded">
            <p className="font-semibold">{alert.type}</p>
            <p className="text-sm">{alert.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsPanel;
