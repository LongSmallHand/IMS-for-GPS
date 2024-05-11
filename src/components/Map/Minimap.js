import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import './Map.css'
import * as BsIcons from "react-icons/bs";
import { IoSpeedometer } from "react-icons/io5";
import { getDeviceFields2 } from '../ucomponents/firestore2';
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from "../pages/AuthContext";

const limeOptions = { color: 'lime' }
const customIcon = new Icon ({
  iconUrl: "image/car.png", 
  iconSize: [40, 40]
})
const dotIcon = new Icon ({
  iconUrl: "image/yellowdot.png",
  iconSize: [30,30]
})

// Example markers
const initialMarkers = [
  {
    geocode: [10, 100],
    speed: 20,
    fuel: 60,
    time: "19:45:36",
  },
];
var preMarkers = [];

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function splitToHms(input) {
  var h, m, s;
  if (input.length === 8) {
      h = input.slice(0, 2);
      m = input.slice(2, 4);
      s = input.slice(4, 6);
  } else {
      h = input.slice(0, 1);
      m = input.slice(1, 3);
      s = input.slice(3, 5);
  }

  return h + "h" + m + "m";
}

function MiniMap() {
  const { authUser, isLoading } = useAuth();
  const [markers, setMarkers] = useState(initialMarkers);
  const [devices, setDevices] = useState([]);
  const [multiPolyline, setMultiPolyline] = useState([]);
  const [newDeviceKey, setNewDeviceKey] = useState("");

  const initMarker = ref => { if (ref) { ref.openPopup() }};

  useEffect(() => {
    const fetchDeviceKey = async () => {
      if (authUser) {
        const userRef = doc(db, 'users', authUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.deviceKey) {
            setNewDeviceKey(userData.deviceKey);
            // console.log("DeviceKey: " + userData.deviceKey)
          }
        }
      }
    };

    fetchDeviceKey();
  }, [authUser]);


  useEffect(() => {
    // const markersRef = ref(database, '/Data/Location');
    const unsub = onSnapshot(doc(db, "devices", "1913991"), (doc) => {
      const data = doc.data();
      // console.log(data)

      if (data) {
        const newMarker = {
          geocode: [data.lat, data.lng],
          speed: data.speed,
          fuel: data.fuel,
          time: data.t_v
        };
        setMarkers((prevMarkers) => [newMarker]);
        // Create a new polyline whenever a new array is added
        setMultiPolyline((prevPolyline) => [...prevPolyline, newMarker.geocode]);
        console.log(newMarker)
        console.log(newMarker.geocode[0], newMarker.geocode[1], newMarker.speed, newMarker.fuel, newMarker.time);
        let flag0 = newMarker;
        var flag1;
        if(flag0 !== flag1){
          flag1 = flag0;
          preMarkers.push(newMarker);
          // console.log(preMarkers)
          multiPolyline.push(newMarker.geocode);
          console.log(multiPolyline)
        }
      }
      else {
        console.error("Firestore data is undefined or missing properties.");}
    });
  }, []);

  return (

    <MapContainer center={[10.763622, 106.640172]} zoom={15} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={18}/>
      <LocationMarker/>

      {preMarkers.map((marker) => (
          <Marker position={marker.geocode} icon={dotIcon}>
            <Popup
            closeButton = {false}
            >
            <div style={{textAlign:"center", fontSize:"0.9rem"}}>
              {marker.time}
            </div>
            </Popup>
          </Marker>
      ))}
      
      <Polyline pathOptions = {limeOptions} positions={multiPolyline}/>

      {markers.map((newMarker) => (
          <Marker ref={initMarker} position={newMarker.geocode} icon={customIcon} zIndexOffset={1}>
            <Popup
            autoClose = {false}
            closeButton = {false}
            keepInView = {false}
            >
            <div style={{display:"grid", width:"5rem"}}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <div style={{textAlign:"left", fontSize:"0.9rem"}}>
                  {newMarker.time}
                </div>
                <div style={{textAlign:"right", fontSize:"0.9rem"}}>
                  Tốc độ dự kiến:
                </div>
              </div>
              <div style={{
                display:"flex", 
                justifyContent:"space-between", 
                alignItems:"center", 
                backgroundColor:"#228B22", 
                backgroundColor:"#228B22", 
                height:"4rem", 
                borderRadius:"10px"}}
              >
                <div style={{textAlign:"center", color: "white", width:"45%"}}>
                  <IoSpeedometer style={{fontSize:"1.5rem", marginBottom:"5px"}}/> 
                  <div style={{fontSize:"0.9rem"}}>
                  {newMarker.speed} kph
                  </div>
                </div>
                <div style={{textAlign:"center", color: "white", width:"40%"}}>
                  <BsIcons.BsFuelPumpFill style={{fontSize:"1.5rem", marginBottom:"5px"}}/> 
                  <div style={{fontSize:"0.9rem"}}>
                  {newMarker.fuel} %
                  </div>
                </div>
              </div>
            </div>
            </Popup>
          </Marker>
      ))}
    </MapContainer>

  );
}

export default MiniMap;