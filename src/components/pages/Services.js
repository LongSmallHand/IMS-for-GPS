import React from 'react';
import '../../App.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import * as FaIcons from "react-icons/fa6";
function Services() {
  return (
    <>
      <Navbar />
      <Card sx={{ maxWidth: "90%", margin: "3rem 5%", backgroundColor:"#f3f4f5", borderRadius:"2rem"}}>
      <CardActionArea sx={{display: "flex"}}>
        <CardContent sx={{width:"65%", padding:"0 1.5rem"}}>
          <Typography gutterBottom sx={{ fontSize:"1.8rem", fontWeight:"500", lineHeight:"120%", color:"indianred"}}  component="div">
          LOCA cập nhật dữ liệu của bạn 24/7
          </Typography>
          <Typography paragraph sx={{ fontSize:"1.2rem", lineHeight:"150%"}}>
          Giúp bạn dễ dàng hơn trong việc quản lý phương tiện cá nhân.
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{width:"35%"}}
          image="https://cdni.iconscout.com/illustration/free/thumb/free-location-4085815-3385484.png"
          alt="Share your think"
        />
      </CardActionArea>
      </Card>

      <Typography sx={{ maxWidth: "90%", margin: "6rem auto 4rem 15%", color:"green"}} variant="h3">Các tính năng chính của LOCA</Typography>

      <Card sx={{ maxWidth: "90%", margin: "3rem 5%", backgroundColor:"seashell", borderRadius:"2rem", display:"flex", padding:"3rem 0"}}>
        <CardContent sx={{display:"flex", justifyContent:"space-evenly", width:"100%"}}>
        <div style={{maxWidth:"40%"}}>
        <FaIcons.FaMapLocationDot 
        style={{color: "skyblue", fontSize:"2.5rem", marginLeft:"5%"}}
        />
        <Typography gutterBottom sx={{fontSize:"2rem", fontWeight:"500", color:"skyblue"}}>
        Định vị phương tiện
        </Typography>

        <Typography>
        Sử dụng GPS để định vị chính xác vị trí của thiết bị trên bản đồ. Người dùng có thể xem vị trí của các thiết bị và theo dõi khi chúng di chuyển.
        </Typography>
        </div>

        <div style={{maxWidth:"40%"}}>
        <FaIcons.FaFileArrowUp 
        style={{color: "coral", fontSize:"2.5rem", marginLeft:"5%"}}
        />
        <Typography gutterBottom sx={{fontSize:"2rem", fontWeight:"500", color:"coral"}}>
        Báo cáo thông số
        </Typography>

        <Typography>
        Cung cấp báo cáo chi tiết về vị trí, tốc độ, các điểm đến gần đây và một số thông tin khác của thiết bị như hình ảnh trực tiếp, mức độ nhiên liệu, thời tiết tại vị trí phương tiện.
        </Typography>
        </div>

        </CardContent>
      </Card>
      <Footer />
    </>
  );
}

export default Services;