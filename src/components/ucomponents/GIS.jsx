import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "./theme";
import { mockTransactions } from "../../data/mockData";
import * as BsIcons from "react-icons/bs";
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import { FaSquareParking } from "react-icons/fa6";
import { IoSpeedometer } from "react-icons/io5";
import StatBox from "./StatBox";
import LocaBox from "./LocationBox";
import WeatherBox from "./WeatherBox";
import ApexCharts from "apexcharts";
import { useState, useEffect } from "react";
import MiniMap from  "./../Map/Minimap";
import "./styles.module.css";
// import {limeOptions, customIcon, dotIcon} from "./../Map/Map";



const limeOptions = { color: 'lime' }
const customIcon = new Icon ({
  iconUrl: "image/car.png", 
  iconSize: [40, 40]
})
const dotIcon = new Icon ({
  iconUrl: "image/yellowdot.png",
  iconSize: [30,30]
})

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

const GIS = ({ devName, devNum, lat, lng, img, time, fuel, speed, state, id}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  var icon;
  if(state === 'Di chuyển'){
    icon = <BsIcons.BsCarFrontFill 
    style={{ color: colors.greenAccent[600], fontSize:"2rem", marginLeft:"0.25rem"}}/>
  }
  else {
    icon = <FaSquareParking 
    style={{ color: colors.greenAccent[600], fontSize:"2rem", marginLeft:"0.25rem"}}/>
  }

  // Use state to manage the stack of "vị trí gần đây" data
  const [recentLocations, setRecentLocations] = useState([]);
  const [locationVal, setLocationVal] = useState("");
  const [location, setLocation] = useState(null);
  

const updateLocationVal = (newLocationVal) => {
    setLocationVal(newLocationVal);
  };
  // Function to update the stack when values change
  useEffect(() => {
    const newLocation = {
      devName,
      time,
    locationVal,
      // Add other properties as needed
    };
    // console.log(newLocation)

    // Use the spread operator to create a new array with the new location added
    setRecentLocations(prevLocations => [newLocation, ...prevLocations].slice(0, 4));
}, [devName, time, locationVal]);

useEffect(() => {
    if (location) {
      setLocation.onLocationUpdate(location);
    }
  }, [location]);


  const initializeColumnChart = () => {
    const options = {
        chart: {
            type: 'bar',
            height: 300,
            toolbar: {
                show: false
            }
        },
        series: [{
            name: 'Sales',
            data: [30, 20, 10]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar']
        }
    };

    const chart = new ApexCharts(document.getElementById('column-chart'), options);
    chart.render();
};
useEffect(() => {
    initializeColumnChart();

    return () => {
        // Cleanup code if needed
    };
}, []);

const initializePieChart = () => {
    const options = {
        chart: {
            type: 'pie', // Change the chart type to 'pie'
            height: 350,
            toolbar: {
                show: false
            }
        },
        series: [30, 20, 10], // Adjust the series data format for a pie chart
        labels: ['Jan', 'Feb', 'Mar'], // Use labels instead of categories for a pie chart
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -20, // Adjust the offset to move the labels closer to the center
                }
            }
        }
    };

    const chart = new ApexCharts(document.getElementById('pie-chart'), options);
    chart.render();
};

useEffect(() => {
    initializePieChart();

    return () => {
        // Cleanup code if needed
    };
}, []);

const initializeLineChart = () => {
    const options = {
        series: [
            {
              name: "High - 2013",
              data: [28, 29, 33, 36, 32, 32, 33]
            },
            {
              name: "Low - 2013",
              data: [12, 11, 14, 18, 17, 13, 13]
            }
          ],
            chart: {
            height: 150,
            width:350,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Average High & Low Temperature',
            align: 'left'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            size: 1
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
              text: 'Month'
            }
          },
          yaxis: {
            title: {
              text: 'Temperature'
            },
            min: 5,
            max: 20
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
          }
          };
          const chart = new ApexCharts(document.getElementById('line-chart'), options);
        chart.render();
    };

useEffect(() => {
    initializeLineChart();

    return () => {
        // Cleanup code if needed
    };
}, []);

const initializeBarChart = () => {
    var options = {
        series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }],
        chart: {
        type: 'bar',
        height: 250,
        width: 200,
    },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
          'United States', 'China', 'Germany'
        ],
      }
      };
    const chart = new ApexCharts(document.getElementById('bar-chart'), options);
    chart.render();
};

useEffect(() => {
    initializeBarChart();

    return () => {
        // Cleanup code if needed
    };
}, []);

  return (
    <Box
        gridTemplateColumns="repeat(8, 1fr)" gridAutoRows="160px"
        display="grid" gap="2px" marginBottom="20px"
        
    >
    {/* Device 1 */}
        <Box
            gridColumn="span 8" gridRow="span 3"
            backgroundColor={colors.greenAccent[500]}
            display="grid" gridTemplateColumns="repeat(8, 1fr)" gridAutoRows="160px"
            gap="2px" borderRadius="5px"
            borderColor="red"
        >
            <Box
            marginTop="2px"
            marginLeft="2px"
            gridColumn="span 2"
            gridRow="span 1"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="5px"
            borderColor="black"
            >
            {/* <LocaBox
                devName={devName}
                devNum={devNum}
                lat={lat}
                lng={lng}
                img={img}
                time={time}
                id={id}
                onUpdateLocation={(newId, newLocationVal) => {
                    // Handle the location update as needed
                    updateLocationVal(newLocationVal);
                }}
            /> */}
            <Typography variant="h6">Text inside Box</Typography>
            </Box>
            <Box
            marginTop="2px"
            gridColumn="span 4" gridRow="span 2"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="center" alignItems="center"
            borderRadius="5px"
            >
            <div style={{ width: '100%', height: '100%',}}> {/* Adjust the size as needed */}
            <MiniMap/>
            </div>
            {/* <StatBox
                title="Nhiên liệu"
                subtitle="(%)"
                data={fuel}
                jc="space-evenly"
                icon={<BsIcons.BsFuelPumpFill style={{ 
                color: colors.redAccent[600], 
                fontSize:"2rem", 
                marginLeft:"0.25rem"
                }}/>}
            /> */}
            </Box>
            <Box
            marginTop="2px" marginRight="2px"
            gridColumn="span 2" gridRow="span 1"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="center" alignItems="center"
            borderRadius="5px"
            
            >
            {/* <StatBox
                title="Tốc độ"
                data={speed}
                jc="space-evenly"
                icon={<IoSpeedometer style={{ 
                color: colors.blueAccent[500], 
                fontSize:"2rem", 
                marginLeft:"0.25rem"}}/>}
                subtitle="(km/h)"
            /> */}
            <div id="pie-chart"></div>
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
            {/* <WeatherBox 
                lat={lat}
                lng={lng}
                id={id}
            /> */}
            <div id="column-chart"></div>
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
                
            {/* <StatBox
                title="Trạng thái"
                jc="center"
                icon={icon}
                subtitle={state}
            /> */}
            <div id="bar-chart"></div>
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
            {/* <StatBox
                title="Top 10"
                jc="center"
                icon={icon}
                subtitle={state}
            /> */}
            <div  id="line-chart"></div>
            </Box>
        </Box>

        <Box
            gridColumn="span 4"
            gridRow="span 3"
            backgroundColor={colors.redAccent[500]}
            overflow="auto"
        >
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
            >
            <Typography color={colors.grey[100]} fontSize="1rem" fontWeight="600">
                Vị trí gần đây
            </Typography>
            </Box>
            {/* {mockTransactions.map((transaction, i) => ( */}
            {recentLocations.map((location, index) => (
            <Box
                // key={`${transaction.device}-${i}`}
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
            >
                <Box>
                <Typography
                    color={colors.greenAccent[500]}
                    fontSize="1.3rem"
                    fontWeight="600"
                >
                    {location.devName}
                </Typography>
                <Typography color={colors.grey[100]}>
                    {location.time}
                </Typography>
                </Box>
                <Typography color={colors.grey[100]} textAlign="right" width="8rem">
                {location.locationVal}
                </Typography>
            </Box>
            ))}
        </Box>
    </Box>
  );
};

export default GIS;