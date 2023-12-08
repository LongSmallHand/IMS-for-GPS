// import React, { useRef, useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Icon } from 'leaflet';
// import MarkerClusterGroup from 'react-leaflet-cluster/lib';
// import './Map.css'
// import SearchField from './Search';

// const customIcon = new Icon ({
//   iconUrl: "image/car.png", 
//   iconSize: [40, 40]
// })

// const hereIcon = new Icon ({
//   iconUrl: "image/icon-2.png", 
//   iconSize: [40, 40]
// })

// // Example markers
// const markers = [
//   {
//     geocode: [10.780161, 106.633583],
//     popUp: "177 Thoại Ngọc Hầu - Tân Phú"
//   },
//   {
//     geocode: [10.781425, 106.630782],
//     popUp: "191 Nguyễn Sơn - Tân Phú"
//   },
//   {
//     geocode: [10.777328, 106.629974],
//     popUp: "96 Thạch Lam - Tân Phú"
//   },
//   {
//     geocode: [10.783540661010576, 106.66549156294971],
//     popUp: "103 Trường Sơn - Q.10"
//   },
//   {
//     geocode: [10.781145345222622, 106.66564109757385],
//     popUp: "86 Tam Đảo - Q.10"
//   },
//   {
//     geocode: [10.783079825318294, 106.66655828291151],
//     popUp: "158 Hồ Bá Kiện - Q.10"
//   }
// ];


// function Map() {
//   const mapRef = useRef();
//   const [current_position, setPosition] = useState(null);

//   useEffect(() => {
//     const watch = navigator.geolocation.watchPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       setPosition([latitude, longitude]);
//       mapRef.current.setView([latitude, longitude], mapRef.current.getZoom());
//     });
//     return () => {navigator.geolocation.clearWatch(watch)};
//   }, []);

//   return (
//     <MapContainer ref={mapRef} center={[0, 0]} zoom={15} scrollWheelZoom={true}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={20}/>
//       <SearchField/>

//       {/* Show current position*/}
//       { current_position && (
//         <Marker position={current_position} icon={hereIcon}>
//           <Popup>Bạn đang ở đây</Popup>
//         </Marker>
//       )}

//       {/* Show marker position*/}
//       <MarkerClusterGroup>
//         {markers.map((marker) => (
//             <Marker position={marker.geocode} icon={customIcon}>
//               <Popup>{marker.popUp}</Popup>
//             </Marker>
//         ))}
//       </MarkerClusterGroup>
//     </MapContainer>
//   );
// }

// export default Map;

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import SearchField from './Search';
import './Map.css'
import { onValue, ref } from 'firebase/database';
import { database } from '../../firebase';

const customIcon = new Icon ({
  iconUrl: "image/car.png", 
  iconSize: [40, 40]
})
// const hereIcon = new Icon ({
//   iconUrl: "image/icon-2.png", 
//   iconSize: [40, 40]
// })
const dotIcon = new Icon ({
  iconUrl: "image/yellowdot.png",
  iconSize: [30,30]
})

// Example markers
const initialMarkers = [
  {
    geocode: [0,0],
    popUp: ""
  },
  // {
  //   geocode: [10.780161, 106.633583],
  //   popUp: "177 Thoại Ngọc Hầu - Tân Phú"
  // },
  // {
  //   geocode: [10.781425, 106.630782],
  //   popUp: "191 Nguyễn Sơn - Tân Phú"
  // },
  // {
  //   geocode: [10.777328, 106.629974],
  //   popUp: "96 Thạch Lam - Tân Phú"
  // },
  // {
  //   geocode: [10.783540661010576, 106.66549156294971],
  //   popUp: "103 Trường Sơn - Q.10"
  // },
  // {
  //   geocode: [10.781145345222622, 106.66564109757385],
  //   popUp: "86 Tam Đảo - Q.10"
  // },
  // {
  //   geocode: [10.783079825318294, 106.66655828291151],
  //   popUp: "158 Hồ Bá Kiện - Q.10"
  // }
];
var preMarkers = []

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


function Map() {
  const [markers, setMarkers] = useState(initialMarkers);

  const initMarker = ref => { if (ref) { ref.openPopup() }};

  useEffect(() => {
    const markersRef = ref(database, '/Location');
    const unsubscribe = onValue(markersRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const newMarker = {
          geocode: [data.Latitude, data.Longitude],
          popUp: data.Speed,
        };
        setMarkers((prevMarkers) => [newMarker]);
        console.log(newMarker.geocode[0], newMarker.geocode[1], newMarker.popUp);
        let flag0 = newMarker;
        var flag1;
        if(flag0 !== flag1){
          flag1 = flag0;
          preMarkers.push(newMarker);
        }
      }
    });
    return () => {unsubscribe()}
  }, []);

  return (

    <MapContainer center={[10.762622, 106.660172]} zoom={17} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={22}/>
      <SearchField/>
      <LocationMarker/>

      {preMarkers.map((marker) => (
          <Marker position={marker.geocode} icon={dotIcon}></Marker>
      ))}

      {markers.map((newMarker) => (
          <Marker ref={initMarker} position={newMarker.geocode} icon={customIcon} zIndexOffset={1}>
            <Popup
            closeOnClick = {false}
            autoClose = {false}
            closeButton = {false}
            keepInView = {false}
            >
            <div style={{textAlign:"center", fontSize:"0.9rem"}}>
              {newMarker.popUp} (km/h)
            </div></Popup>
          </Marker>
      ))}
    </MapContainer>

  );
}

export default Map;