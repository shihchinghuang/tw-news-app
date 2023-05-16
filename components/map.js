import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl";
import styles from "../styles/Map.module.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.MAPBOX_KEY;

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(122.0378);
  const [lat, setLat] = useState(24.7622);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <p>Taiwan is right here!</p>
        <p>
          Longitude: {lng} | Latitude: {lat}
        </p>
      </div>
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
}
