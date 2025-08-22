// SOSMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const SOSMap = () => {
  const alerts = [
    {
      id: 1,
      title: "Fire at Navrangpura",
      location: [23.0415, 72.5461],
      date: "2025-08-05",
    },
    {
      id: 2,
      title: "Road Accident at SG Highway",
      location: [23.0712, 72.5148],
      date: "2025-08-06",
    },
    {
      id: 3,
      title: "Flooding near Maninagar",
      location: [22.9910, 72.6030],
      date: "2025-08-07",
    },
  ];

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md border border-gray-300">
      <MapContainer
        center={[23.0225, 72.5714]} // Center on Ahmedabad
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {alerts.map((alert) => (
          <Marker key={alert.id} position={alert.location}>
            <Popup>
              <div>
                <h3 className="font-bold">{alert.title}</h3>
                <p className="text-sm text-gray-600">{alert.date}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SOSMap;
