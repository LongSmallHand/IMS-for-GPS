import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import SearchField from './Search';
import './Map.css'
import * as BsIcons from "react-icons/bs";
import { IoSpeedometer } from "react-icons/io5";
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from "../pages/AuthContext";
import styled from "styled-components"

const MyMap = styled(MapContainer)`
  margin-left: 200px;
  height: 100vh;
  z-index: 0;
`
const limeOptions = { color: 'lime' }
const redOptions = { color: 'red' }
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
var preMarkers2 = [];

// const multiPolyline = [
//   [10.782190311067431, 106.62886950633379], 
//   [10.782193143203493, 106.62903672235275], 
//   [10.782125171930517, 106.62924718389387], 
//   // [10.782065697054042, 106.6293740374255], 
//   // [10.781969404371985, 106.62967963911535], 
//   // [10.78189860090964, 106.62985262120394], 
//   // [10.78187027952004, 106.62996505956154], 
//   // [10.781788147475108, 106.63025624607732], 
//   // [10.781604708374992, 106.6306756602561], 
//   // [10.781391752992894, 106.63142421267538],
//   // [10.78108687588743, 106.63140527925799],
// ]
var preMarkers = [];

// const multiPolyline = [
//   [10.782190311067431, 106.62886950633379], 
//   [10.782193143203493, 106.62903672235275], 
//   [10.782125171930517, 106.62924718389387], 
//   // [10.782065697054042, 106.6293740374255], 
//   // [10.781969404371985, 106.62967963911535], 
//   // [10.78189860090964, 106.62985262120394], 
//   // [10.78187027952004, 106.62996505956154], 
//   // [10.781788147475108, 106.63025624607732], 
//   // [10.781604708374992, 106.6306756602561], 
//   // [10.781391752992894, 106.63142421267538],
//   // [10.78108687588743, 106.63140527925799],
// ]

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

function Map() {
  const { authUser, isLoading } = useAuth();
  const [markers, setMarkers] = useState(initialMarkers);
  const [markers2, setMarkers2] = useState(initialMarkers);
  const [devices, setDevices] = useState([]);
  const [multiPolyline, setMultiPolyline] = useState([]);
  const [multiPolyline2, setMultiPolyline2] = useState([]);
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
        const newMarker2 = {
          geocode: [data.box_lat, data.box_lng],
          speed: data.box_spd,
          fuel: data.fuel,
          time: data.t_v
        };
        setMarkers((prevMarkers) => [newMarker]);
        setMarkers2((prevMarkers2) => [newMarker2]);
        // Create a new polyline whenever a new array is added
        setMultiPolyline((prevPolyline) => [...prevPolyline, newMarker.geocode]);http://localhost:3000/user/car1
        setMultiPolyline2((prevPolyline2) => [...prevPolyline2, newMarker2.geocode]);
        console.log(newMarker)
        console.log(newMarker2)
        // console.log(newMarker.geocode[0], newMarker.geocode[1], newMarker.speed, newMarker.fuel, newMarker.time);
        let flag0 = newMarker;
        var flag1;
        let flag2 = newMarker2;
        var flag3;
        if(flag0 !== flag1){
          flag1 = flag0;
          preMarkers.push(newMarker);
          // console.log(preMarkers)
          multiPolyline.push(newMarker.geocode);
          console.log(multiPolyline)
        }
        if(flag2 !== flag3){
          flag3 = flag2;
          preMarkers2.push(newMarker2);
          // console.log(preMarkers)
          multiPolyline2.push(newMarker2.geocode);
          console.log(multiPolyline2)
        }
      }
      else {
        console.error("Firestore data is undefined or missing properties.");}
    });
  }, []);

  return (

    <MyMap center={[10.762622, 106.660172]} zoom={17} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={22}/>
      <SearchField/>
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
      {preMarkers2.map((marker) => (
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
      <Polyline pathOptions = {redOptions} positions={multiPolyline2}/>

      {markers.map((newMarker) => (
          <Marker ref={initMarker} position={newMarker.geocode} icon={customIcon} zIndexOffset={1}>
          </Marker>
      ))}
      {markers2.map((newMarker) => (
          <Marker ref={initMarker} position={newMarker.geocode} icon={customIcon} zIndexOffset={1}>
          </Marker>
      ))}
    </MyMap>

  );
}

export default Map;