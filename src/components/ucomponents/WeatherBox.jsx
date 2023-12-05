import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "./theme";
import { TbTemperatureCelsius } from "react-icons/tb";


const WeatherBox = ({lat, lng, id}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const api_key = "3b8c002696346b49ac11c4f375cbb61d";
  
  const takeData = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric&lang=vi`
    let response = await fetch(url);
    let data = await response.json();

    let humi = document.getElementById(`humi_${id}`);
    humi.innerHTML = data.main.humidity;
    let wind = document.getElementById(`wind_${id}`);
    wind.innerHTML = data.wind.speed;
    let temp = document.getElementById(`temp_${id}`);
    temp.innerHTML = data.main.temp;
    let feel = document.getElementById(`feel_${id}`);
    feel.innerHTML = data.main.feels_like;
    let desc = document.getElementById(`desc_${id}`);
    desc.innerHTML = data.weather[0].description;
    let icon = document.getElementById(`icon_${id}`);
    icon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  }

  return (
    <Box width="100%" m="0 10px">
      <Box display="flex" justifyContent="space-around" justifySelf="center">
        <Box display="grid" justifyContent="center" borderRight="2px solid" 
        borderColor={colors.grey[900]} width="9rem">
            <Box display="flex" justifyContent="center" >
            <img id={`icon_${id}`} src="" alt="Icon thời tiết" 
            style={{display:"flex", justifyContent:"space-evenly", textItem:"center",
            maxHeight: "3.5rem"}}/>
            </Box>
            <Box display="flex" justifyContent="center">
                <Typography
                fontSize="1.8rem"
                fontFamily="'Arial',sans-serif"
                fontWeight="200"
                sx={{ color: colors.greenAccent[600] }}
                >
                    <div id={`temp_${id}`}>0</div>
                </Typography>
                <TbTemperatureCelsius style={{ 
                color: colors.greenAccent[600], 
                fontSize:"1.5rem"
                }}/>
            </Box>
            <Typography
            fontSize="0.8rem"
            fontFamily="'Arial',sans-serif"
            fontWeight="200"
            textAlign="center"
            sx={{ color: colors.grey[300] }}
            >
                <div id={`desc_${id}`}>Chưa cập nhật thời tiết</div>
            </Typography>
        </Box>
        <Box display="grid" alignItems="center" alignContent="center">
            <Typography
            display="flex"
            fontSize="0.8rem"
            fontFamily="'Arial',sans-serif"
            fontWeight="200"
            textAlign="center"
            sx={{ color: colors.grey[100] }}
            >
            Cảm thấy như: <div id={`feel_${id}`} style={{margin:"0 0.2rem 0 0.3rem", fontWeight:"600"}}>0</div>độ
            </Typography>
            <Typography
            display="flex"
            fontSize="0.8rem"
            fontFamily="'Arial',sans-serif"
            fontWeight="200"
            sx={{ color: colors.grey[100] }}
            >
            Độ ẩm: <div id={`humi_${id}`} style={{marginLeft:"0.3rem", fontWeight:"600"}}>0</div>%
            </Typography>
            <Typography
            display="flex"
            fontSize="0.8rem"
            fontFamily="'Arial',sans-serif"
            fontWeight="200"
            textAlign="center"
            sx={{ color: colors.grey[100] }}
            >
            Tốc độ gió: <div id={`wind_${id}`} style={{marginLeft:"0.3rem", fontWeight:"600"}}>0</div>km/h
            </Typography>    
        </Box>
        <Box display="flex" alignItems="center">
            <Button
                sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontSize: "0.9rem",
                fontWeight: "normal",
                padding: "10px 10px",
                }}
                onClick = {()=>{takeData()}}
            >
                Cập nhật
            </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default WeatherBox;