import axios from "axios";


const BASE_URL = "http://localhost:5000"; // Change if your server runs on a different port

export const fetchAirQualityData = async (lat = 19.0760, lon = 72.8777) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/air-quality?lat=${lat}&lon=${lon}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching air quality data:", error);
    throw error;
  }
};


export const submitIssueReport = async (data) => {
  const res = await fetch(`${BASE_URL}/api/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Add more API functions here...
