import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "./theme";
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import ApexCharts from "apexcharts";
import { useState, useEffect, useRef } from "react";
import MiniMap from "./../Map/Minimap";
import "./styles.module.css";
import { doc, getDoc, onSnapshot, query, collection, where } from 'firebase/firestore';
import { db } from "../../firebase";
import { useAuth } from "../pages/AuthContext";

const customIcon = new Icon({
  iconUrl: "image/car.png",
  iconSize: [40, 40]
});
const dotIcon = new Icon({
  iconUrl: "image/yellowdot.png",
  iconSize: [30, 30]
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
}

const GIS = ({ devName, devNum, lat, lng, img, time, fuel, speed, state, id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { authUser } = useAuth();
  const [deviceData, setDeviceData] = useState([]);

  const columnChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    if (!authUser) return;

    const fetchData = async () => {
      const userRef = doc(db, 'users', authUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.deviceKey) {
          // Handle device key if needed
        }
      }

      const devicesQuery = query(collection(db, "devices"), where("uid", "==", authUser.uid));
      const unsub = onSnapshot(devicesQuery, (snapshot) => {
        let fields = [];

        snapshot.docs.forEach((doc) => {
          const device = doc.data();
          if (device) {
            fields.push({
              devName: device.devName,
              devNum: device.devNum,
              id: device.id,
              lat: device.lat,
              lng: device.lng,
              speed: device.speed,
              state: device.state,
              time: device.t_v,
              distance: device.total_distance,
            });
          }
        });

        setDeviceData(fields);
        initializeCharts(fields);
      });

      return () => unsub();
    };

    fetchData();
  }, [authUser]);

  const initializeCharts = (data) => {
    initializeColumnChart();
    initializePieChart();
    initializeLineChart();
    initializeBarChart(data);
  };

  const initializeColumnChart = () => {
    const chartElement = columnChartRef.current;
    if (chartElement) {
      const options = {
        series: [
          {
            name: 'Average Speed',
            data: [
              { x: 'Truck1', y: 60, goals: [{ name: 'Highest Speed', value: 77, strokeHeight: 5, strokeColor: '#775DD0' }] },
              { x: 'Truck2', y: 50, goals: [{ name: 'Highest Speed', value: 70, strokeHeight: 5, strokeColor: '#775DD0' }] },
              { x: 'Truck3', y: 57, goals: [{ name: 'Highest Speed', value: 72, strokeHeight: 5, strokeColor: '#775DD0' }] },
              { x: 'Truck4', y: 55, goals: [{ name: 'Highest Speed', value: 80, strokeHeight: 5, strokeColor: '#775DD0' }] },
              { x: 'Truck5', y: 49, goals: [{ name: 'Highest Speed', value: 69, strokeHeight: 5, strokeColor: '#775DD0' }] },
            ]
          }
        ],
        chart: { height: 350, type: 'bar' },
        plotOptions: { bar: { columnWidth: '60%' } },
        colors: ['#00E396'],
        dataLabels: { enabled: false },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Average Speed', 'Highest Speed'],
          markers: { fillColors: ['#00E396', '#775DD0'] }
        }
      };

      const chart = new ApexCharts(chartElement, options);
      chart.render();
    }
  };

  const initializePieChart = () => {
    const chartElement = pieChartRef.current;
    if (chartElement) {
      const options = {
        chart: {
          type: 'pie',
          height: 500,
          width: "100%",
          toolbar: { show: false }
        },
        title: { text: 'Status', align: 'center' },
        series: [20, 60, 20],
        labels: ['Driving', 'Parking', 'Inactive'],
        plotOptions: {
          pie: { dataLabels: { offset: -10 } }
        }
      };

      const chart = new ApexCharts(chartElement, options);
      chart.render();
    }
  };

  const initializeLineChart = () => {
    const chartElement = lineChartRef.current;
    if (chartElement) {
      const options = {
        series: [
          { name: "Top Trip Count", data: [30, 32, 37, 27, 28] },
          { name: "Average Trip Count", data: [21, 19, 23, 24, 22] }
        ],
        chart: {
          height: 170,
          width: 490,
          type: 'line',
          dropShadow: { enabled: true, color: '#000', top: 18, left: 7, blur: 10, opacity: 0.2 },
          zoom: { enabled: false },
          toolbar: { offsetX: 20, show: true }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: { enabled: true },
        stroke: { curve: 'smooth' },
        title: { offsetY: 15, text: 'Trips count', align: 'center' },
        grid: {
          borderColor: '#e7e7e7',
          row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }
        },
        markers: { size: 1 },
        xaxis: { categories: ['Truck1', 'Truck2', 'Truck3', 'Truck4', 'Truck5'], title: { text: '', offsetY: -5 } },
        yaxis: { title: { text: '' }, min: 5, max: 40 },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -10,
          offsetX: -5
        }
      };
      const chart = new ApexCharts(chartElement, options);
      chart.render();
    }
  };

  const initializeBarChart = (data) => {
    if (!Array.isArray(data)) {
      console.error("Invalid data provided to initializeBarChart:", data);
      return;
    }

    const chartElement = barChartRef.current;
    const distances = data.map(device => device.distance);
    const names = data.map(device => device.devName);

    if (chartElement) {
      const options = {
        series: [{ name: "km", data: distances }],
        chart: { type: 'bar', height: 300, width: 250 },
        toolbar: { offsetX: 120, offsetY: 50, show: true },
        plotOptions: {
          bar: { borderRadius: 4, borderRadiusApplication: 'end', horizontal: true }
        },
        dataLabels: { enabled: false },
        xaxis: { categories: names },
        title: { offsetY: 15, text: 'Distance by month', align: 'center' }
      };
      const chart = new ApexCharts(chartElement, options);
      chart.render();
    }
  };

  return (
    <Box gridTemplateColumns="repeat(8, 1fr)" gridAutoRows="180px" display="grid" gap="2px" marginBottom="20px">
      <Box
        gridColumn="span 8" gridRow="span 3"
        backgroundColor="black"
        display="grid" gridTemplateColumns="repeat(8, 1fr)" gridAutoRows="180px"
        gap="2px" borderRadius="5px"
        borderColor="red"
      >
        <Box
          marginTop="2px"
          marginLeft="2px"
          gridColumn="span 2"
          gridRow="span 0.5"
          backgroundColor={colors.grey[1000]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="5px"
          borderColor="black"
        >
          <Typography variant="h7">Total Distance Driven: 800 Km<br />
            <br />
            <br />Total trips count: 134
          </Typography>
        </Box>
        <Box
          marginTop="2px"
          gridColumn="span 4" gridRow="span 2"
          backgroundColor={colors.grey[1000]}
          display="flex"
          justifyContent="center" alignItems="center"
          borderRadius="5px"
        >
          <div style={{ width: '100%', height: '100%' }}> {/* Adjust the size as needed */}
            <MiniMap />
          </div>
        </Box>
        <Box
          marginTop="2px" marginRight="2px"
          gridColumn="span 2" gridRow="span 1"
          backgroundColor={colors.grey[1000]}
          display="flex"
          justifyContent="center" alignItems="center"
          borderRadius="5px"
        >
          <div ref={pieChartRef} id="pie-chart"></div>
        </Box>
        <Box
          marginBottom="2px" marginLeft="2px"
          gridColumn="span 2" gridRow="span 2"
          backgroundColor={colors.grey[1000]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="5px"
        >
          <div ref={columnChartRef} id="column-chart"></div>
        </Box>
        <Box
          marginBottom="2px" marginRight="2px"
          gridColumn="span 2" gridRow="span 2"
          backgroundColor={colors.grey[1000]}
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          borderRadius="5px"
        >
          <div ref={barChartRef} id="bar-chart"></div>
        </Box>
        <Box
          marginBottom="2px"
          gridColumn="span 4" gridRow="span 1"
          backgroundColor={colors.grey[1000]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="8px"
        >
          <div ref={lineChartRef} id="line-chart"></div>
        </Box>
      </Box>
    </Box>
  );
};

export default GIS;
