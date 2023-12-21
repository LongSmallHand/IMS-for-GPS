import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "./theme";
import * as BsIcons from "react-icons/bs";
import Header from "./header";
import DeviceBoard from "./DeviceBoard";
import { useAuth } from "../pages/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDeviceFields } from "./firestore";
import * as XLSX from 'xlsx';



const handleDownload = () => {
  // Tạo một mảng dữ liệu mẫu
  const data = [
    ['Tên', 'Số điện thoại', 'Email'],
    ['John Doe', '123-456-7890', 'john@example.com'],
    ['Jane Doe', '987-654-3210', 'jane@example.com'],
    // ...Thêm dữ liệu của bạn vào đây
  ];

  // Tạo một đối tượng Worksheet từ mảng dữ liệu
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Tạo một đối tượng Workbook và thêm Worksheet vào đó
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Dữ liệu');

  // Chuyển đổi Workbook thành dạng nhị phân
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

  // Tạo một Blob từ dữ liệu nhị phân
  const blob = new Blob([s2ab(wbout)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);

  // Đặt tên cho file tải xuống
  a.download = 'Report.xlsx';

  // Tạo sự kiện click cho thẻ <a>
  a.click();

  // Giải phóng URL khi không cần thiết nữa (thường khi người dùng đóng cửa sổ tải xuống)
  URL.revokeObjectURL(a.href);
};

// Hàm chuyển đổi chuỗi thành mảng đệm
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

const Dashboard = () => {
  const { authUser, isLoading } = useAuth();
  const router = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // State involved in loading and updating device info
  const [devices, setDevices] = useState([]);
  // const [updateReceipt, setUpdateReceipt] = useState({});



  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/');
    }
  }, [authUser, isLoading])

  useEffect(() => {
    if (authUser) {
      const unsubscribe = getDeviceFields(authUser.uid, setDevices);
      // console.log("Devices: ", devices); // Log the devices state
      // return () => unsubscribe();
    }
  }, [authUser]);


  
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
            onClick={handleDownload}
          >
            <BsIcons.BsDownload style={{ margin: "0 10px 0 0"}} />
            Tải xuống
          </Button>
        </Box>
      </Box>
      
  {devices.map((device) => (
    
  <DeviceBoard
    id={device.id}
    devName={device.devName}
    devNum={device.devNum}
    lat={device.lat}
    lng={device.lng}
    img={device.img}
    time="10 giây trước" // Update thời gian chụp hình gần nhất
    fuel={device.fuel}
    speed={device.speed}
    state="Di chuyển" // set = "Đang đỗ" nếu speed < 2km/h
  />
))}
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