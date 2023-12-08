import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "./theme";
import * as BsIcons from "react-icons/bs";
import Header from "./header";
import DeviceBoard from "./DeviceBoard";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px 20px 20px 240px" minWidth="900px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Bảng điều khiển"/>
        <Box>
          <Button
            sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "1rem",
              fontWeight: "normal",
              margin: "0 1rem 30px 0",
              padding: "10px 20px",
            }}
          >
            <BsIcons.BsCartPlusFill style={{ margin: "0 10px 0 0"}} />
            Thêm thiết bị
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "1rem",
              fontWeight: "normal",
              margin: "0 0 30px 0",
              padding: "10px 20px",
            }}
          >
            <BsIcons.BsDownload style={{ margin: "0 10px 0 0"}} />
            Tải xuống
          </Button>
        </Box>
      </Box>
      
      {/* Device 1 */}
      <DeviceBoard
      id="1"
      devName="AirBlade"
      devNum="59D1-123.45"
      lat="10.772945833"
      lng="106.658995167"
      img="https://randomwordgenerator.com/img/picture-generator/man-1828202_640.jpg"
      time="10 giây trước"
      fuel="40"
      speed="35"
      state="Di chuyển"
      />

      {/* Device 2 */}
      {/* <DeviceBoard
      id="2"
      devName="Honda"
      devNum="59D1 - 999.99"
      lat="10.779529896233225"
      lng="106.63127133744312"
      img="https://randomwordgenerator.com/img/picture-generator/55e3d6414b50a414f1dc8460962e33791c3ad6e04e507440742a7ed1964bc6_640.jpg"
      time="10 phút trước"
      fuel="40"
      speed="35"
      state="Dừng"
      /> */}
    </Box>
  );
};

export default Dashboard;