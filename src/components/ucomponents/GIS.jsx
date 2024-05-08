import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "./theme";
import { mockTransactions } from "../../data/mockData";
import * as BsIcons from "react-icons/bs";
import { FaSquareParking } from "react-icons/fa6";
import { IoSpeedometer } from "react-icons/io5";
import StatBox from "./StatBox";
import LocaBox from "./LocationBox";
import WeatherBox from "./WeatherBox";
import { useState, useEffect } from "react";
import Map from  "./../Map/Map";
import { black } from "tripkit-react";

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

 

  return (
    <Box
        gridTemplateColumns="repeat(8, 1fr)" gridAutoRows="200px"
        display="grid" gap="20px" marginBottom="20px"
    >
    {/* Device 1 */}
        <Box
            gridColumn="span 8" gridRow="span 3"
            backgroundColor={colors.greenAccent[500]}
            display="grid" gridTemplateColumns="repeat(8, 1fr)" gridAutoRows="140px"
            gap="20px" borderRadius="20px"
        >
            <Box
            marginTop="2px"
            marginLeft="2px"
            gridColumn="span 1"
            gridRow="span 1"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="20px"
            borderColor={colors.black}
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
            </Box>
            <Box
            marginTop="2px" marginRight="2px"
            gridColumn="span 5" gridRow="span 2"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="space-between" alignItems="center"
            borderRadius="20px"
            >
            <Map lat={lat} lng={lng} id={id} />
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
            justifyContent="space-between" alignItems="center"
            borderRadius="20px"
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
            </Box>
            <Box
            marginBottom="2px" marginLeft="2px"
            gridColumn="span 1" gridRow="span 2"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="20px"
            >
            {/* <WeatherBox 
                lat={lat}
                lng={lng}
                id={id}
            /> */}
            </Box>
            <Box
            marginBottom="2px" marginRight="2px"
            gridColumn="span 2" gridRow="span 2"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="20px"
            >
            {/* <StatBox
                title="Trạng thái"
                jc="center"
                icon={icon}
                subtitle={state}
            /> */}
            </Box>
            <Box
            marginBottom="2px" marginRight="2px"
            gridColumn="span 5" gridRow="span 1"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="20px"
            >
            {/* <StatBox
                title="Top 10"
                jc="center"
                icon={icon}
                subtitle={state}
            /> */}
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