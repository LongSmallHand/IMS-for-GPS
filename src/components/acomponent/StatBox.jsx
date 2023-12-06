import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import ProgressCircle from "./chart/ProgressCircle";

const StatBox = ({ title, subtitle, icon, increase, progress, progress_1, isProgress }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4"  fontWeight="bold" sx={{ color: colors.grey[100] }}>
            {title}
          </Typography>
          <Box display="flex" justifyContent="space-between" mt="2px">
            <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
              {subtitle}  
            </Typography>
            <Typography variant="h5" fontStyle="italic" sx={{ color: colors.greenAccent[600]}}>
              {increase}
            </Typography>
          </Box>
        </Box>
        {isProgress && (
            <Box display="flex" justifyContent="space-between" width="55%" alignSelf="center">
              <Box>
                <Typography variant="h6" sx={{color:"skyblue"}}>
                Người dùng cũ {progress*100}%
                </Typography>
                <Typography variant="h6" sx={{color:"lightgreen"}}>
                Người dùng mới {progress_1*100}%
                </Typography>
                <Typography variant="h6" sx={{color:"khaki"}}>
                Khác
                </Typography>
              </Box>
              <ProgressCircle progress={progress} progress_1={progress_1} />
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default StatBox;
