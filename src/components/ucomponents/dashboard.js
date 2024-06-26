import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "./theme";
import * as BsIcons from "react-icons/bs";
import Header from "./header";
import DeviceBoard from "./DeviceBoard";
import GIS from "./GIS";
import { useAuth } from "../pages/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDeviceFields } from "./firestore";
import { getDeviceFields2 } from "./firestore2";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import * as XLSX from 'xlsx';
import AddDeviceForm from "./AddDeviceForm";
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Dashboard = () => {
  const { authUser, isLoading } = useAuth();
  const router = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State involved in loading and updating device info
  const [devices, setDevices] = useState([]);
  const [locationsData, setLocationsData] = useState([]);
  const [newDeviceKey, setNewDeviceKey] = useState("");
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchDeviceKey = async () => {
      if (authUser) {
        const userRef = doc(db, 'users', authUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.deviceKey) {
            setNewDeviceKey(userData.deviceKey);
            console.log("DeviceKey: " + userData.deviceKey)
          }
        }
      }
    };

    fetchDeviceKey();
  }, [authUser]);

  const handleClick = () => {
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
  };

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/');
    }
  }, [authUser, isLoading]);

  useEffect(() => {
    if (authUser && newDeviceKey) {
      const unsubscribe = getDeviceFields2(newDeviceKey, authUser.uid, setDevices);

      // return () => {
      //   // Cleanup function
      //   unsubscribe();
      // };
    }
  }, [authUser, newDeviceKey]);

  const handleDownload = () => {
    // Tạo một mảng dữ liệu mẫu
    const data = [
      ['Phương tiện', 'Biển số', 'Nhiên liệu', 'Tốc độ'],
      // ['John Doe', '123-456-7890', 'john@example.com'],
      // ['Jane Doe', '987-654-3210', 'jane@example.com'],
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dữ liệu');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    const blob = new Blob([s2ab(wbout)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);

    a.download = 'Report.xlsx';

    a.click();

    URL.revokeObjectURL(a.href);
  };

  // Hàm chuyển đổi chuỗi thành mảng đệm
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  return (
    <Box m="20px 20px 20px 220px" minWidth="900px">
      <Box display="flex" justifyContent="space-between" height="40px" alignItems="center">
        <Header title="Bảng điều khiển"/>
        <Box>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              fontSize: "1rem",
              fontWeight: "normal",
              margin: "0 1rem 30px 0",
              padding: "10px 20px",
            }}
            onClick={handleClick}
          >
            <BsIcons.BsCartPlusFill style={{ margin: "0 10px 0 0"}} />
            Thêm/Xoá thiết bị
          </Button>
          {isFormOpen && (
            <div>
              <AddDeviceForm isOpen={isFormOpen}
                handleClose={handleClose}
                onDeviceKeySubmit={setNewDeviceKey} />
              {/* <button onClick={handleClose}>Đóng</button> */}
            </div>
          )}
          {/* <Button
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
          </Button> */}
        </Box>
      </Box>

      {devices.map((device, index) => (
        <Box key={index} display="flex" flexDirection="column" gap="10px">
          <GIS
            id={device.id}
            devName={device.devName}
            devNum={device.devNum}
            lat={device.lat}
            lng={device.lng}
            time={device.t_v}
            speed={device.speed}
            state={device.state}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Dashboard;