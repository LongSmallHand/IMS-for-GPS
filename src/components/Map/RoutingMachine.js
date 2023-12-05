// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import 'reflect-metadata';
// import { TKRoot, TKUITripPlanner } from 'tripkit-react';

// const config = {
//     apiKey: "f5199054338f9905f76a85e546d72425"
// };

// const root = ReactDOM.createRoot(document.getElementById('here'));

// // root.render(
// //   <TKRoot config={config}>
// //     <TKUITripPlanner />
// //   </TKRoot>);

import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = () => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(33.52001088075479, 36.26829385757446),
      L.latLng(33.50546582848033, 36.29547681726967)
    ],
    lineOptions: { styles: [{ color: "#6FA1EC", weight: 4 }] },
    show: false,
    addWaypoints: true,
    routeWhileDragging: false,
    draggableWaypoints: true,
    fitSelectedRoutes: "smart",
    showAlternatives: true,
    autoRoute: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
