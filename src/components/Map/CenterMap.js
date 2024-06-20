import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function CenterMap({ markers, shouldFitBounds }) {
  const map = useMap();

  useEffect(() => {
    if (shouldFitBounds && markers.length > 0) {
      const bounds = markers.map(marker => marker.geocode);
      map.fitBounds(bounds);
    }
  }, [markers, shouldFitBounds, map]);

  return null;
}

export default CenterMap;
