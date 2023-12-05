import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster/lib';
import './Map.css'
import SearchField from './Search';

const customIcon = new Icon ({
  iconUrl: "image/car.png", 
  iconSize: [40, 40]
})

const hereIcon = new Icon ({
  iconUrl: "image/icon-2.png", 
  iconSize: [40, 40]
})

// Example markers
const markers = [
  {
    geocode: [10.780161, 106.633583],
    popUp: "177 Thoại Ngọc Hầu - Tân Phú"
  },
  {
    geocode: [10.781425, 106.630782],
    popUp: "191 Nguyễn Sơn - Tân Phú"
  },
  {
    geocode: [10.777328, 106.629974],
    popUp: "96 Thạch Lam - Tân Phú"
  },
  {
    geocode: [10.783540661010576, 106.66549156294971],
    popUp: "103 Trường Sơn - Q.10"
  },
  {
    geocode: [10.781145345222622, 106.66564109757385],
    popUp: "86 Tam Đảo - Q.10"
  },
  {
    geocode: [10.783079825318294, 106.66655828291151],
    popUp: "158 Hồ Bá Kiện - Q.10"
  }
];


function Map() {
  const mapRef = useRef();
  const [current_position, setPosition] = useState(null);

  useEffect(() => {
    const watch = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
      mapRef.current.setView([latitude, longitude], mapRef.current.getZoom());
    });
    return () => {navigator.geolocation.clearWatch(watch)};
  }, []);

  return (
    <MapContainer ref={mapRef} center={[0, 0]} zoom={15} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={20}/>
      <SearchField/>

      {/* Show current position*/}
      { current_position && (
        <Marker position={current_position} icon={hereIcon}>
          <Popup>Bạn đang ở đây</Popup>
        </Marker>
      )}

      {/* Show marker position*/}
      <MarkerClusterGroup>
        {markers.map((marker) => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;