import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import './leaflet.css';
function SearchField(){
  
    const icon = new Icon ({
        iconUrl: "image/yellowdot.png", 
        iconSize: [40, 40]
      })

  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
    provider: provider,
    marker: { icon },
    style: 'button',
    searchLabel: 'Nhập địa chỉ',
    notFoundMessage: 'Không tìm được địa chỉ',
    showMarker: true,
    showPopup: true,
    popupFormat: ({ query, result }) => result.label,
    resultFormat: ({ result }) => result.label,
    maxMarkers: 1,
    retainZoomLevel: true,
    animateZoom: true, 
    autoClose: false, 
    keepResult: false, 
    updateMap: true,
  });
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  });

  return null;
}
export default SearchField;