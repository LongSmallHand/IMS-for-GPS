import { Box } from "@mui/material";
import Header from "./Header";
import LineChart from "./chart/LineChart";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Biểu đồ doanh thu" subtitle="So sánh doanh thu 3 năm gần nhất" />
      <Box height="65vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
