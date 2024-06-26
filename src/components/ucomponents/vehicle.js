import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from '../ucomponents/theme';
import Header from "../ucomponents/header";
import { dataVehicles } from "../../data/vehicleData";
const Vehicle = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "id", 
      headerName: "ID", 
      headerAlign: "center",
      align: "center",
      width: 50
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      flex: 1,
      width: 200 
    },
    {
      field: "temp",
      headerName: "Nhiệt độ",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 120
    },
    {
      field: "speed",
      headerName: "Vận tốc",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 120  
    },
    {
      field: "door",
      headerName: "Trạng thái",
      type: "boolean",
      headerAlign: "center",
      align:"center",
      width: 120,
    },
    {
      field: "fuel",
      headerName: "Nhiên liệu",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 120
    },
    {
      field: "pos",
      headerName: "Vị trí",
      flex: 1,
      width: 300
    },
  ];

  return (
    <>
      <Box m="20px 20px 20px 240px">
        <Header title="Dữ liệu phương tiện" subtitle="Cập nhật tình trạng phương tiện của bạn ngay bây giờ" />
        <Box
          m="40px 0 0 0"
          height="100%"
          maxHeight="70vh"
          maxWidth="1000px"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
          rows={dataVehicles} 
          columns={columns} 
          pageSizeOptions={2}  
          />
        </Box>
      </Box>
    </>
  );
};

export default Vehicle;