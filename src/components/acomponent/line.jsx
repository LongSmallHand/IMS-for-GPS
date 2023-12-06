import { Box } from "@mui/material";
import Header from "./Header";
import LineChart from "./chart/LineChart";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="65vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
