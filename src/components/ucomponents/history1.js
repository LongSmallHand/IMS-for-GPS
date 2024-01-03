import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from './theme';
import Header from "./header";
import { useEffect, useState } from "react";
import { getDeviceFields } from "./firestore";
import { useAuth } from "../pages/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import * as XLSX from 'xlsx'; 


const History1 = () => {
  const { authUser, isLoading } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useNavigate();

  const [rows, setRows] = useState([]);
  const [devices, setDevices] = useState([]);
  // const [locationsData, setLocationsData] = useState([]);
  const [newDeviceKey, setNewDeviceKey] = useState("");
  // const [showDeviceForm, setShowDeviceForm] = useState(false);
  // const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/');
    }
  }, [authUser, isLoading]);


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


  useEffect(() => {
    if (authUser && newDeviceKey) {
      const unsubscribe = getDeviceFields(newDeviceKey, authUser.uid, (data) => {
        console.log(data)
        setDevices(data); // Assuming getDeviceFields returns an array of devices
        setRows(data); // Set the rows based on the fetched data
      });
      return () => {
        // Cleanup function
        unsubscribe();
      };
    }
  }, [authUser, newDeviceKey]);

  const columns = [
    {
      field: "id", 
      headerName: "ID",
      width: 70
    },
    // {
    //   field: "date",
    //   headerName: "Ngày",
    //   type: "Date",
    //   width: 120
    // },
    {
      field: "t_v",
      headerName: "Thời Gian",
      type: "text",
      width: 150
    },
    {
      field: "devName",
      headerName: "Phương tiện",
      type: "text",
      headerAlign: "center",
      align: "center",
      width: 200
    },
    {
      field: "speed",
      headerName: "Tốc độ",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 90
    },
    {
      field: "devNum",
      headerName: "Biển sổ",
      type: "text",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "fuel",
      headerName: "Nhiên liệu",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 90
    },
    // {
    //   field: "pos",
    //   headerName: "Vị trí",
    //   flex: 1,
    //   width: 120
    // },
  ];

  const handleDownload = () => {
    const data = [
      ['Phương tiện', 'Biển số', 'Nhiên liệu', 'Tốc độ', 'Thời gian'],
      ...rows.map(row => [row.devName, row.devNum, row.fuel, row.speed, row.t_v])
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

  // Helper function to convert string to ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  return (
    <>
      <Box m="20px 20px 20px 240px">
        <Header title="Lịch sử dữ liệu phương tiện"/>
        <Box
          m="40px 0 0 0"
          height="100%"
          maxHeight="70vh"
          maxWidth="1000px"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
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
            Tải xuống
          </Button>

          <DataGrid 
          checkboxSelection 
          rows={rows} 
          columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default History1;
