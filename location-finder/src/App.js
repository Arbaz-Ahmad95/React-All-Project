import { useEffect, useState } from "react";
import Map, { Marker, FlyToInterpolator } from "react-map-gl";
import Fly from "./Components/Fly";
import { ImLocation } from "react-icons/im";
import "./App.css";

const API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

function App() {
  const [lat, setLat] = useState(22.5726);
  const [lon, setLon] = useState(88.3639);

  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lon,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    width: "100%",
    height: "100vh",
  });

  useEffect(() => {
    setViewport((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lon,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.0 }),
      transitionDuration: "auto",
    }));
  }, [lat, lon]);

  return (
    <Map
      mapboxAccessToken={API_KEY}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
    >
      <Marker latitude={lat} longitude={lon}>
        <ImLocation size="30px" color="red" />
      </Marker>
      <Fly setLat={setLat} setLon={setLon} />
    </Map>
  );
}

export default App;
