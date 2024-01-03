import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import Header from "./Header";
import StatBox from "./StatBox";
import LineChart from "./chart/LineChart";
import ProgressCircle from "./chart/ProgressCircle";
import * as MuiIcons from "@mui/icons-material";
import "./home.scss";
import Widget from "./widget";
import { collection, query,where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";


const calculatePercentageIncrease = (currentCount, previousCount) => {
  if (previousCount === 0) {
    return 100; // Tránh chia cho 0 nếu tuần trước không có người dùng
  }
  return ((currentCount - previousCount) / previousCount) * 100;
};

const calculatePercentage = (currentCount, previousCount) => {
  if (previousCount === 0) {
    return 100; // Tránh chia cho 0 nếu tuần trước không có người dùng
  }
  return ((previousCount) / previousCount + currentCount);
};

const fetchCollectionCount = async (collectionName) => {
  try {
    const col = collection(db, collectionName);
    const q = query(col);
    const snapshot = await getDocs(q);

    return snapshot.size;
  } catch (error) {
    console.error(`Error fetching data from ${collectionName} collection:`, error);
    return 0; // Trả về 0 nếu có lỗi
  }
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userCount, setUserCount] = useState(0);
  const [userCountTime, setUserCountTime] = useState(0);
  const [deviceCount, setDeviceCount] = useState(0);
  const [newUserPercentage, setNewUserPercentage] = useState(0);
  const [percentOldUsers, setPercentOldUsers] = useState(0);

  

  useEffect(() => {
    const fetchData = async () => {
      setUserCount(await fetchCollectionCount("users"));
      setDeviceCount(await fetchCollectionCount("devices"));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  
      const currentMonthQuery = query(
        collection(db, "users"),
        where("timeStamp", ">=", firstDayOfCurrentMonth)
      );
      const lastMonthQuery = query(
        collection(db, "users"),
        where("timeStamp", ">=", firstDayOfLastMonth),
        where("timeStamp", "<", firstDayOfCurrentMonth)
      );
  
      const currentMonthData = await getDocs(currentMonthQuery);
      const lastMonthData = await getDocs(lastMonthQuery);
  
      setUserCountTime(currentMonthData.size);
      // console.log(currentMonthData.size)
      // console.log(lastMonthData.size)
      setNewUserPercentage(
        calculatePercentageIncrease(currentMonthData.size, lastMonthData.size)
      );
      const percentOldUsers = calculatePercentage(currentMonthData.size, lastMonthData.size);
      console.log(percentOldUsers)
      setPercentOldUsers(percentOldUsers); 
    };
  
    fetchData();
  }, []);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="BẢNG ĐIỀU KHIỂN" subtitle="Cập nhật các số liệu, thống kê mới nhất" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <MuiIcons.Download sx={{ mr: "10px" }} />
            Tải xuống
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${newUserPercentage.toFixed(2)}%`} 
            subtitle="Tăng so với tháng trước "
            isProgress="true"
            progress={percentOldUsers}
            progress_1={100 - percentOldUsers}
            increase={`+${newUserPercentage.toFixed(2)}%`}
            icon={<MuiIcons.PointOfSale sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={userCount.toString()} 
            subtitle="Số lượng người dùng hiện tại"
            icon={<MuiIcons.AccountCircle sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={deviceCount.toString()} 
            subtitle="Số lượng thiết bị hiện tại"
            // increase="+9%"
            icon={<MuiIcons.PersonAdd sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>}
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Lợi nhuận
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" progress="0.2"/>
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
             6,352,000
            </Typography>
            <Typography sx={{marginTop:"10px"}}>Doanh thu sau khi đã khấu trừ các loại thuế, phí</Typography>
          </Box>
        </Box>
        
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Thống kê doanh thu theo năm
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                66.000.000 VND
              </Typography>
            </Box>
            
            <Box>
              <IconButton>
                <MuiIcons.Download
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>


      </Box>
    </Box>
  );
};

export default Dashboard;
