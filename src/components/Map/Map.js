import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import SearchField from './Search';
import './Map.css'
import { onValue, ref } from 'firebase/database';
import { database } from '../../firebase';
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
var preMarkers = [
  // {
  //   geocode: [10.782190311067431, 106.62886950633379], 
  //   speed: 20,
  //   fuel: 60,
  //   date: "01/01/2024",
  //   time: "19:45:36"
  // },
  // {
  //   geocode: [10.782193143203493, 106.62903672235275], 
  //   speed: 20,
  //   fuel: 60,
  //   date: "01/01/2024",
  //   time: "19:45:49"
  // },
  // {
  //   geocode: [10.782125171930517, 106.62924718389387], 
  //   speed: 20,
  //   fuel: 60,
  //   date: "01/01/2024",
  //   time: "19:51:34"
  // },
  // {
  //   geocode: [10.782065697054042, 106.6293740374255], 
  //   speed: 20,
  //   fuel: 60,
  //   date: "01/01/2024",
  //   time: "19:52:36"
  // },
  // {
  //   geocode: [10.781969404371985, 106.62967963911535], 
  //   speed: 20,
  //   fuel: 60,
  //   date: "01/01/2024",
  //   time: "19:52:53"
  // },
  // {
  //   geocode: [10.78189860090964, 106.62985262120394], 
  //   speed: 20,
  //   fuel: 60,
  //   date: "01/01/2024",
  //   time: "19:53:23"
  // },
  // {
  //   geocode: [10.78187027952004, 106.62996505956154], 
  //   speed: 20,
  //   fuel: 60,
  //   date: "01/01/2024",
  //   time: "19:56:24"
  // },
  // {
  //   geocode: [10.781788147475108, 106.63025624607732], 
  //   speed: 20,
  //   fuel: 60,
  //   date: "01/01/2024",
  //   time: "19:57:14"
  // },
  // {
  //   geocode: [10.781604708374992, 106.6306756602561], 
  //   speed: 20,
  //   fuel: 60,
  //   date: "01/01/2024",
  //   time: "19:58:36"
  // },
  // {
  //   geocode: [10.781391752992894, 106.63142421267538], 
  //   speed: 20,
  //   fuel: 60,
  //   date: "01/01/2024",
  //   time: "19:58:36"
  // },
];

const multiPolyline = [
  [10.782190311067431, 106.62886950633379], 
  [10.782193143203493, 106.62903672235275], 
  [10.782125171930517, 106.62924718389387], 
  // [10.782065697054042, 106.6293740374255], 
  // [10.781969404371985, 106.62967963911535], 
  // [10.78189860090964, 106.62985262120394], 
  // [10.78187027952004, 106.62996505956154], 
  // [10.781788147475108, 106.63025624607732], 
  // [10.781604708374992, 106.6306756602561], 
  // [10.781391752992894, 106.63142421267538],
  // [10.78108687588743, 106.63140527925799],
]

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
  // input = input + 7000000;
  // input = input.toString();
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

  // useEffect(() => {
  //   if (authUser && newDeviceKey) {
  //     const unsubscribe = getDeviceFields2(newDeviceKey, authUser.uid, setDevices);
  //     // console.log(setMarkers)
  //     return () => {
  //       // Cleanup function
  //       unsubscribe();
  //     };
  //   }
  // }, [authUser, newDeviceKey]);

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
    // return () => {unsubscribe()}
  }, []);

  return (

    <MapContainer center={[10.762622, 106.660172]} zoom={17} scrollWheelZoom={true}>
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
      
      <Polyline pathOptions = {limeOptions} positions={multiPolyline}/>

      {markers.map((newMarker) => (
          <Marker ref={initMarker} position={newMarker.geocode} icon={customIcon} zIndexOffset={1}>
            <Popup
            autoClose = {false}
            closeButton = {false}
            keepInView = {false}
            >
            <div style={{display:"grid", width:"9rem"}}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                {/* <div style={{textAlign:"right", fontSize:"0.9rem"}}>
                  {newMarker.date}
                </div> */}
                <div style={{textAlign:"left", fontSize:"0.9rem"}}>
                  {newMarker.time}
                </div>
              </div>
              <div style={{
                display:"flex", 
                justifyContent:"space-between", 
                alignItems:"center", 
                backgroundColor:"lime", 
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

export default Map;