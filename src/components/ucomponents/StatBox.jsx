import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";

const StatBox = ({ title, subtitle, icon, progress, data, jc}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 1rem">
      <Box display="flex" justifyContent="center">
        <Typography 
          fontSize="1rem"
          fontWeight="800"
          sx={{ color: colors.grey[100] }}
        >
          {title}
        </Typography>
      </Box>
      <Box display="flex" justifyContent={jc} alignItems="center" marginTop="0.25rem">
          {icon}
        <Typography
          marginTop="0.25rem"
          marginRight="0.25rem"
          fontSize="1.5rem" fontWeight="500"
          sx={{ color: colors.primary[600] }}
        >
          {data}
        </Typography>
      </Box>
      <Typography 
        display="flex"
        marginTop="0.5rem"
        alignItems="center"
        fontSize="1rem" fontWeight="500"
        justifyContent="center"
        sx={{ color: colors.primary[300] }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default StatBox;
