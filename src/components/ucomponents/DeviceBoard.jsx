import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "./theme";
import { mockTransactions } from "../../data/mockData";
import * as BsIcons from "react-icons/bs";
import { FaSquareParking } from "react-icons/fa6";
import { IoSpeedometer } from "react-icons/io5";
import StatBox from "./StatBox";
import LocaBox from "./LocationBox";
import WeatherBox from "./WeatherBox";

const DeviceBoard = ({ devName, devNum, lat, lng, img, time, fuel, speed, state, id}) => {
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

  return (
    <Box
        gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px"
        display="grid" gap="20px" marginBottom="20px"
    >
    {/* Device 1 */}
        <Box
            gridColumn="span 8" gridRow="span 3"
            backgroundColor={colors.grey[900]}
            display="grid" gridTemplateColumns="repeat(8, 1fr)" gridAutoRows="140px"
            gap="20px" borderRadius="30px"
        >
            <Box
            marginTop="20px"
            marginLeft="20px"
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="30px"
            >
            <LocaBox
                devName={devName}
                devNum={devNum}
                lat={lat}
                lng={lng}
                img={img}
                time={time}
                id={id}
            />
            </Box>
            <Box
            marginTop="20px" marginRight="20px"
            gridColumn="span 2" gridRow="span 1"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="space-between" alignItems="center"
            borderRadius="30px"
            >
            <StatBox
                title="Nhiên liệu"
                subtitle="(%)"
                data={fuel}
                jc="space-evenly"
                icon={<BsIcons.BsFuelPumpFill style={{ 
                color: colors.redAccent[600], 
                fontSize:"2rem", 
                marginLeft:"0.25rem"
                }}/>}
            />
            </Box>
            <Box
            marginRight="20px"
            gridColumn="span 2" gridRow="span 1"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="space-between" alignItems="center"
            borderRadius="30px"
            >
            <StatBox
                title="Tốc độ"
                data={speed}
                jc="space-evenly"
                icon={<IoSpeedometer style={{ 
                color: colors.blueAccent[500], 
                fontSize:"2rem", 
                marginLeft:"0.25rem"}}/>}
                subtitle="(km/h)"
            />
            </Box>
            <Box
            marginBottom="20px" marginLeft="20px"
            gridColumn="span 6" gridRow="span 1"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="30px"
            >
            <WeatherBox 
                lat={lat}
                lng={lng}
                id={id}
            />
            </Box>
            <Box
            marginBottom="20px" marginRight="20px"
            gridColumn="span 2" gridRow="span 1"
            backgroundColor={colors.grey[1000]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="30px"
            >
            <StatBox
                title="Trạng thái"
                jc="center"
                icon={icon}
                subtitle={state}
            />
            </Box>
        </Box>

        <Box
            gridColumn="span 4"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
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
            {mockTransactions.map((transaction, i) => (
            <Box
                key={`${transaction.device}-${i}`}
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
                    {transaction.device}
                </Typography>
                <Typography color={colors.grey[100]}>
                    {transaction.date}
                </Typography>
                </Box>
                <Typography color={colors.grey[100]} textAlign="right" width="8rem">
                {transaction.location}
                </Typography>
            </Box>
            ))}
        </Box>
    </Box>
  );
};

export default DeviceBoard;