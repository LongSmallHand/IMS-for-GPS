import { Box, useTheme } from "@mui/material";
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
            Thắc mắc về anh Nong
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Anh Nong đẹp trai vl 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Thắc mắc về anh Nghĩa
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Anh Nghĩa có mấy người yêu ?
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Thắc mắc về anh Huy
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Đít anh Huy có ổn không ?
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Thắc mắc về anh Lam
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Tiền lương anh Lam nhiều vậy làm sao tiêu hết ?
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
