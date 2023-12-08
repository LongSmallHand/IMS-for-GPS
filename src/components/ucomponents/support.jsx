import { Box, TextField, Button } from "@mui/material";
import Header from "./header";

const Support = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px 20px 20px 240px" minWidth="32rem">
        <Header 
            title="Hỗ trợ người dùng"
            subtitle="Liên hệ với chúng tôi khi bạn có câu hỏi hoặc gặp vấn đề khi sử dụng LOCA"
        />
        <Box display="flex" justifyContent="left">
            <Box
            component="form"
            maxWidth="70vw"
            minWidth="40vw"
            sx={{ '& .MuiTextField-root': { m:"1.5rem 1.5rem 0 1.5rem", minWidth:"40%", maxWidth:"90%" } }}
            noValidate
            autoComplete="on"
            backgroundColor="#FFF6F6"
            borderRadius="20px"
            display="grid"
            justifyContent="center"
            >
                <Box  display="flex" justifyContent="space-between">
                    <TextField
                    required
                    id="name"
                    label="Tên"
                    type="text"
                    color="success"
                    fullWidth
                    />
                    <TextField
                    required
                    id="mail"
                    label="Email"
                    type="email"
                    color="success"
                    fullWidth
                    />
                </Box>
                <Box>
                    <TextField
                    required
                    multiline
                    fullWidth
                    id="outlined-helperText"
                    label="Nhập câu hỏi của bạn"
                    helperText="Góp ý của bạn về LOCA"
                    rows={10}
                    color="success"
                    />
                </Box>
                <Button
                sx={{
                    backgroundColor: "#7FFFD4",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    margin: "1.5rem 1.5rem",
                    padding: "10px 20px",
                    '&:hover': { backgroundColor: "#000000" }
                }}>
                Xác nhận
                </Button>
            </Box>
        </Box>
    </Box>
  );
};

export default Support;