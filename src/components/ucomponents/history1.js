import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from './theme';
import Header from "./header";
import { useEffect, useState } from "react";
import { getDeviceFields } from "./firestore";
import { useAuth } from "../pages/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';


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
        // unsubscribe();
      };
    }
  }, [authUser, newDeviceKey]);

  const columns = [
    {
      field: "id", 
      headerName: "ID",
      width: 70
    },
    {
      field: "date",
      headerName: "Ngày",
      type: "Date",
      width: 120
    },
    {
      field: "time",
      headerName: "Thời Gian",
      type: "time",
      width: 150
    },
    {
      field: "devName",
      headerName: "Phương tiện",
      type: "text",
      headerAlign: "center",
      align: "center",
      width: 150
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
