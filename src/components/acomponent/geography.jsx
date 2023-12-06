import { Box, useTheme } from "@mui/material";
import GeographyChart from "./chart/GeographyChart";
import Header from "./Header";
import { tokens } from "./theme";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Bản đồ LOCA" subtitle="Người dùng của LOCA đến từ đâu" />

      <Box
        height="65vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;
