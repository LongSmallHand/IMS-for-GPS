import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import { useEffect, useState, useRef } from "react";

const LocaBox = ({ devName, devNum, lat, lng, img, time, id, onUpdateLocation}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [locationVal, setLocationVal] = useState("");

  const locationRef = useRef(null);
  
  const takeLocation = async () => {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=36810e7faa9b4963a2d6f66e9ee9ffa6&lang=vi`
    const response = await fetch(url);
    const data = await response.json();
    // const name = document.getElementById( `location_${id}`);
    const newLocationVal = data.features[0].properties.address_line2;


    if (locationRef.current) {
      locationRef.current.innerHTML = newLocationVal;
    }

    setLocationVal(newLocationVal);

    // Gọi hàm onUpdateLocation để thông báo về sự thay đổi
    onUpdateLocation(id, newLocationVal);
    clearInterval(check);
    //console.log(name.innerHTML)
  }

  useEffect(() => {
    // Call takeData when the component is mounted
    takeLocation();
  }, []); // Empty dependency array ensures that it runs only once when the component mounts

  let check = setInterval(takeLocation, 5000);
  return (
    <Box width="100%" m="0 1.5rem">
      <Box>
        <Typography 
          fontSize="1.5rem"
          fontWeight="800"
          sx={{ color: colors.grey[100] }}
        >
          Thiết bị: {devName} ({devNum})
        </Typography>
        <Typography 
          display="flex"
          fontSize="1rem" fontWeight="500"
          sx={{ color: colors.grey[100] }}
        >
          Vị trí: 
          <Typography
  id={`location_${id}`}
  ref={locationRef} // Use ref to get a reference to the element
  fontSize="1rem"
  fontWeight="500"
  marginLeft="0.5rem"
  sx={{ color: colors.grey[100], width: "85%" }}
></Typography>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-around" alignItems="center" marginTop="2rem">
      <Box
        component="img"
        sx={{ height: "120px", borderRadius: "1rem" }}
        src={img}
        onClick={()=>{takeLocation()}}
        title="Hình ảnh mới nhất từ thiết bị"
      />
      <Typography
        textAlign="left"
        marginTop="1rem"
        fontSize="1rem" fontWeight="500"
        justifyContent="center"
        width="9rem"
        sx={{ color: colors.primary[300] }}
      >
        Lần cuối cập nhật: {time}
      </Typography>
      </Box>
    </Box>
  );
};

export default LocaBox;
