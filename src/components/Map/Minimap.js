import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import './Map.css';
import { IoSpeedometer } from "react-icons/io5";
import { BsFillStopwatchFill } from "react-icons/bs";
import { doc, getDoc, onSnapshot, query, collection, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from "../pages/AuthContext";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3721/3721600.png",
  iconSize: [40, 40]
});

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const formatTime = (datetime) => {
  const date = new Date(datetime);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function CenterMap({ markers }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = markers.map(marker => marker.geocode);
      map.fitBounds(bounds);
    }
  }, [markers, map]);

  return null;
}

const convertSpeedToKmh = (speedInMs) => {
  return (speedInMs * 3.6).toFixed(2);
}

function MiniMap() {
  const { authUser } = useAuth();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchDeviceKey = async () => {
      if (!authUser) return;
      
      const userRef = doc(db, 'users', authUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.deviceKey) {
          // Handle device key if needed
        }
      }
    };

    fetchDeviceKey();
  }, [authUser]);

  useEffect(() => {
    if (!authUser) return;

    const devicesQuery = query(collection(db, "devices"), where("uid", "==", authUser.uid));
    const unsub = onSnapshot(devicesQuery, (snapshot) => {
      const newMarkers = snapshot.docs.map(doc => {
        const device = doc.data();
        return {
          devName: device.devName,
          devNum: device.devNum,
          id: device.id,
          lat: device.lat,
          lng: device.lng,
          speed: device.speed,
          state: device.state,
          time: device.t_v,
          distance: device.total_distance,
          geocode: [device.lat, device.lng]
        };
      });

      setMarkers(newMarkers);
    });

    return () => unsub();
  }, [authUser]);

  return (
    <MapContainer center={[10.763622, 106.640172]} zoom={12} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={18} />
      <LocationMarker />
      <CenterMap markers={markers} />

      {markers.map((marker, index) => (
        <Marker 
          key={index} 
          position={marker.geocode} 
          icon={customIcon} 
        >
          <Popup>
            <div style={{ display: "flex", alignItems: "center", backgroundColor: "black", color: "green", borderRadius: "10px", padding: "10px" }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <span style={{ fontWeight: "bold", color: "white", fontSize: "1rem" }}>{marker.devName}</span>
                <br />
                <span style={{ color: "red" }}>{convertSpeedToKmh(marker.speed)} km/h</span>
              </div>
              {marker.speed === 0 && (
                <div style={{ flex: 1, textAlign: "center", marginLeft: "5px" }}>
                  <BsFillStopwatchFill style={{ fontSize: "1rem", color: "red" }} />
                  <br />
                  <span style={{ fontSize: "0.8rem" }}>{formatTime(marker.time)}</span>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MiniMap;
