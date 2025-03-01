import React, { useState } from "react";
import Axios from "axios";

const API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

const Fly = ({ setLat, setLon }) => {
  const [city, setCity] = useState("Kolkata");

  const getCoordinates = async () => {
    try {
      const res = await Axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${API_KEY}`
      );

      if (res.data.features.length === 0) {
        alert("City not found. Please try again.");
        return;
      }

      setLon(res.data.features[0].geometry.coordinates[0]);
      setLat(res.data.features[0].geometry.coordinates[1]);
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Failed to fetch location. Check your API key and internet connection.");
    }
  };

  return (
    <div className="fly">
      <h2>Enter a city name</h2>
      <div className="inp-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={getCoordinates}>Go</button>
      </div>
    </div>
  );
};

export default Fly;
