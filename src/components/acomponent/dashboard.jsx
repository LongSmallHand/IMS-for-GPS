import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import Header from "./Header";
import StatBox from "./StatBox";
import LineChart from "./chart/LineChart";
import ProgressCircle from "./chart/ProgressCircle";
import * as MuiIcons from "@mui/icons-material";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
            title="8.000.000"
            subtitle="Doanh thu tháng"
            isProgress="true"
            progress="0.3"
            progress_1="0.65"
            increase="+14%"
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
            title="805"
            subtitle="Số lượng người dùng"
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
            title="26"
            subtitle="Người dùng mới"
            increase="+5%"
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
                17.847.000 VND
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
