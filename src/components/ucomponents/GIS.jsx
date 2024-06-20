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
import useDebounce from "./useDebounce"; // import the debounce hook

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
      map.flyTo(e.latlng);
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
  const [chartInstances, setChartInstances] = useState({});

  const columnChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);

  const debouncedDeviceData = useDebounce(deviceData, 500); // 500ms debounce delay

  useEffect(() => {
    if (!authUser) return;

    const unsubscribe = fetchData(authUser.uid, setDeviceData);
    
    return () => unsubscribe();
  }, [authUser]);

  const fetchData = (uid, setDeviceData) => {
    const devicesQuery = query(collection(db, "devices"), where("uid", "==", uid));
    const unsub = onSnapshot(devicesQuery, (snapshot) => {
      let fields = [];
      snapshot.docs.forEach((documentSnapshot) => {
        const device = documentSnapshot.data();
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
      });
      console.log(fields);
      setDeviceData(fields);
    });
    return unsub;
  };

  const countVehicleStates = (data) => {
    let driving = 0;
    let parking = 0;
    let inactive = 0;

    data.forEach(device => {
      if (device.state === 'Di chuyển') {
        driving += 1;
      } else if (device.state === 'Đang đỗ') {
        parking += 1;
      } else if (device.state === 'Inactive') {
        inactive += 1;
      }
    });

    return [driving, parking, inactive];
  };

  const initializeCharts = () => {
    initializeColumnChart();
    initializePieChart();
    initializeLineChart();
    initializeBarChart();
  };

  const initializeColumnChart = () => {
    const chartElement = columnChartRef.current;
    if (chartElement) {
      const options = {
        series: [],
        chart: { height: 350, type: 'bar' },
        plotOptions: { bar: { columnWidth: '60%' } },
        colors: ['#00E396'],
        dataLabels: { enabled: false },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Speed', 'Highest Speed'],
          markers: { fillColors: ['#00E396', '#775DD0'] }
        }
      };

      const chart = new ApexCharts(chartElement, options);
      chart.render();

      setChartInstances(prevInstances => ({
        ...prevInstances,
        columnChart: chart
      }));
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
        series: [],
        labels: ['Driving', 'Parking', 'Inactive'],
        plotOptions: {
          pie: { dataLabels: { offset: -10 } }
        }
      };

      const chart = new ApexCharts(chartElement, options);
      chart.render();

      setChartInstances(prevInstances => ({
        ...prevInstances,
        pieChart: chart
      }));
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

      setChartInstances(prevInstances => ({
        ...prevInstances,
        lineChart: chart
      }));
    }
  };

  const initializeBarChart = () => {
    const chartElement = barChartRef.current;
    if (chartElement) {
      const options = {
        series: [{ name: "km", data: [] }],
        chart: { type: 'bar', height: 300, width: 250 },
        toolbar: { offsetX: 120, offsetY: 50, show: true },
        plotOptions: {
          bar: { borderRadius: 4, borderRadiusApplication: 'end', horizontal: true }
        },
        dataLabels: { enabled: false },
        xaxis: { categories: [] },
        title: { offsetY: 15, text: 'Distance by month', align: 'center' }
      };

      const chart = new ApexCharts(chartElement, options);
      chart.render();

      setChartInstances(prevInstances => ({
        ...prevInstances,
        barChart: chart
      }));
    }
  };

  const updateCharts = (data) => {
    if (chartInstances.columnChart) {
      const speeds = data.map(device => device.speed);
      const seriesData = data.map(device => ({
        x: device.devName,
        y: parseFloat(device.speed.toFixed(1))
      }));
      chartInstances.columnChart.updateSeries([{ name: 'Speed', data: seriesData }]);
    }

    if (chartInstances.pieChart) {
      const [driving, parking, inactive] = countVehicleStates(data);
      chartInstances.pieChart.updateSeries([driving, parking, inactive]);
    }

    // if (chartInstances.lineChart) {
    //   const tripsCounts = data.map(device => device.tripsCount || 0);
    //   chartInstances.lineChart.updateSeries([{ name: 'Trip Count', data: tripsCounts }]);
    // }

    if (chartInstances.barChart) {
      const distances = data.map(device => device.distance);
      chartInstances.barChart.updateSeries([{ name: 'km', data: distances }]);
      chartInstances.barChart.updateOptions({ xaxis: { categories: data.map(device => device.devName) } });
    }
  };

  useEffect(() => {
    if (
      columnChartRef.current && 
      pieChartRef.current && 
      lineChartRef.current && 
      barChartRef.current
    ) {
      initializeCharts();
    }
  }, []);

  useEffect(() => {
    if (debouncedDeviceData.length > 0) {
      updateCharts(debouncedDeviceData);
    }
  }, [debouncedDeviceData]);

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
