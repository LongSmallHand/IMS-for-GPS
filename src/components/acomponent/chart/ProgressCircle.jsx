import { Box } from "@mui/material";
const ProgressCircle = ({ progress = "", progress_1 = "", size = "60" }) => {
  const angle_1 = progress * 360;
  const angle_2 = progress_1 * 360;
  const angle = 360 - (angle_1 + angle_2);
  return (
    <Box
      sx={{
        // background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%)`
        background: 
        `conic-gradient( transparent 0deg ${angle}deg,
          skyblue ${angle}deg ${angle+angle_1}deg, 
          lightgreen ${angle+angle_1}deg 360deg ), khaki`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};
export default ProgressCircle;