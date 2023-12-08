import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from './theme';
import Header from "./header";
import { his1 } from "../../data/vehicleHistory1";
const History1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "id", 
      headerName: "ID",
      width: 50
    },
    {
      
      field: "date",
      headerName: "Ngày",
      type: "Date",
      width: 120
    },
    {
      
      field: "time",
      headerName: "Thời Gian",
      type: "time",
      width: 90
    },
    {
      field: "temp",
      headerName: "Nhiệt độ",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 90
    },
    {
      field: "speed",
      headerName: "Tốc độ",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 90
    },
    {
      field: "door",
      headerName: "Trạng thái",
      type: "boolean",
      headerAlign: "center",
      width: 90,
    },
    {
      field: "fuel",
      headerName: "Nhiên liệu",
      type: "number",
      headerAlign: "center",
      align: "center",
      width: 90
    },
    {
      field: "pos",
      headerName: "Vị trí",
      flex: 1,
      width: 120
    },
  ];

  return (
    <>
      <Box m="20px 20px 20px 240px">
        <Header title="Dữ liệu AirBlade"/>
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
          <DataGrid checkboxSelection rows={his1} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default History1;