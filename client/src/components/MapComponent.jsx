import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapComponent = () => {
  const [location, setLocation] = useState(null); // User location
  const [places, setPlaces] = useState([]);
  const [type, setType] = useState(null); // 'pharmacy' or 'hospital'

  // Get accurate current location
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error('Geolocation error:', err);
        alert('Location access denied. Please enable location.');
        // Default to Ahmedabad
        setLocation([23.0225, 72.5714]);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    getCurrentLocation(); // Get location on initial load
  }, []);

  // Fetch places using Overpass API
  const fetchPlaces = async (placeType) => {
    if (!location) return;
    setType(placeType);

    const overpassUrl = 'https://overpass-api.de/api/interpreter';
    const query = `
      [out:json];
      (
        node["amenity"="${placeType}"](around:15000,${location[0]},${location[1]});
        way["amenity"="${placeType}"](around:15000,${location[0]},${location[1]});
        relation["amenity"="${placeType}"](around:15000,${location[0]},${location[1]});
      );
      out center;
    `;

    try {
      const res = await fetch(overpassUrl, {
        method: 'POST',
        body: query,
      });
      const data = await res.json();

      const elements = data.elements.map((el) => {
        const lat = el.lat || el.center?.lat;
        const lon = el.lon || el.center?.lon;
        return {
          id: el.id,
          lat,
          lon,
          name: el.tags?.name || 'Unknown',
        };
      });

      setPlaces(elements);
    } catch (err) {
      console.error('Error fetching places:', err);
    }
  };

  const RecenterMap = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      if (coords) {
        map.setView(coords, 13);
      }
    }, [coords, map]);
    return null;
  };

  return (
    <div className="w-full">
      {/* Buttons */}
      <div className="mb-4 mt-5 flex gap-4 justify-start px-4">
        <button
          onClick={() => fetchPlaces('pharmacy')}
          className="bg-blue-900 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Medicals
        </button>
        <button
          onClick={() => fetchPlaces('hospital')}
          className="bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Hospitals
        </button>
        <button
          onClick={getCurrentLocation}
          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-xl"
          title="Refresh Location"
        >
          📍
        </button>
      </div>

      {/* Map */}
      {location && (
        <MapContainer
          center={location}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '600px', width: '100%' }}
          className="rounded-xl shadow-lg"
        >
          <RecenterMap coords={location} />

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Current Location Marker */}
          <Marker position={location}>
            <Popup>Your Current Location</Popup>
          </Marker>

          {/* Display Selected Places */}
          {places.map((place) => (
            <Marker key={place.id} position={[place.lat, place.lon]}>
              <Popup>
                <strong>{place.name}</strong><br />
                Type: {type}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
