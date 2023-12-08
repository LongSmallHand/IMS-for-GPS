import { Box, Button, TextField, useTheme } from "@mui/material";
import Header from "./Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "./theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="PHẢN HỒI" subtitle="Giải quyết các yêu cầu từ người dùng" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Vấn đề về GPS
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Thiết bị không nhận được dữ liệu định vị
          </Typography>
          <Box display="flex" justifyContent={"space-between"} sx={{marginTop:"1rem"}}>
          <TextField
            variant="outlined"
            type="text"
            label="Trả lời"
            sx={{ fontSize:"1rem", maxWidth:"75%", minWidth:"70%"}}
          />  
          <Button type="submit" color="secondary" sx={{fontSize:"0.8rem", right:"20px", maxWidth:"20%"}} >
            Xác nhận
          </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Lượng nhiên liệu đo được không chính xác
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          </Typography>
          <Box display="flex" justifyContent={"space-between"} sx={{marginTop:"1rem"}}>
          <TextField
            variant="outlined"
            type="text"
            label="Trả lời"
            sx={{ fontSize:"1rem", maxWidth:"75%", minWidth:"70%"}}
          />  
          <Button type="submit" color="secondary" sx={{fontSize:"0.8rem", right:"20px", maxWidth:"20%"}} >
            Xác nhận
          </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Lỗi cam
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Hình ảnh nhận được từ camera không nhìn thấy được
          </Typography>
          <Box display="flex" justifyContent={"space-between"} sx={{marginTop:"1rem"}}>
          <TextField
            variant="outlined"
            type="text"
            label="Trả lời"
            sx={{ fontSize:"1rem", maxWidth:"75%", minWidth:"70%"}}
          />  
          <Button type="submit" color="secondary" sx={{fontSize:"0.8rem", right:"20px", maxWidth:"20%"}} >
            Xác nhận
          </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Cách thêm thiết bị
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Làm sao để thêm thiết bị mới vào hệ thống ?
          </Typography>
          <Box display="flex" justifyContent={"space-between"} sx={{marginTop:"1rem"}}>
          <TextField
            variant="standard"
            type="text"
            label="Tại trang 'Bảng điều khiển', nhấn vào nút 'Thêm thiết bị', nhận vào ID thiết bị và tên phương tiện để yêu cầu hệ thống thêm thiết bị mới vào."
            disabled
            sx={{ fontSize:"1rem", maxWidth:"75%", minWidth:"70%"}}
          />  
          <Button type="submit" color="secondary" disabled sx={{fontSize:"0.8rem", right:"20px", maxWidth:"20%"}} >
            Đã trả lời
          </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
