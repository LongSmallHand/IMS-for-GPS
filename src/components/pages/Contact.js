import React from 'react';
import '../../App.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import * as FaIcons from "react-icons/fa6";

function Contact() {
  return (
    <>
      <Navbar />
      <Card sx={{ maxWidth: "90%", margin: "3rem 5%", backgroundColor:"#f3f4f5", borderRadius:"2rem"}}>
      <CardActionArea sx={{display: "flex"}}>
        <CardContent sx={{width:"65%", padding:"0 1.5rem"}}>
          <Typography gutterBottom sx={{ fontSize:"2rem", fontWeight:"500", lineHeight:"120%", color:"hotpink"}}  component="div">
          Liên hệ với đội ngũ LOCA
          </Typography>
          <Typography paragraph sx={{ fontSize:"1rem", lineHeight:"150%"}}>
          Mọi góp ý phản hồi hay những điều bạn muốn ở LOCA, hãy chia sẻ tại đây!
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{width:"35%"}}
          image="https://pahrumpaccessrealty.com/wp-content/uploads/2016/09/030OnnVPTu6j2IZiBkbi_28_Contact-Us.png"
          alt="Share your think"
        />
      </CardActionArea>
      </Card>
      
      <div style={{display:"flex", width: "90%", margin: "3rem 5%", justifyContent:"space-between"}}>
      <Card sx={{ width: "40%", borderRadius:"2rem"}}>
          <CardActionArea>
          <CardMedia
            component="img"
            sx={{width:"100%", borderRadius:"30px"}}
            image="https://pmpenglish.edu.vn/wp-content/uploads/2017/06/Dai-hc-BK-TP-HCM.jpg"
            alt="Member"
          />
          </CardActionArea>
      </Card>

      <Card sx={{ width: "55%", backgroundColor:"#dbf2ff", borderRadius:"2rem", display:"grid", justifyContent:"center", alignContent:"center"}}>
        <Typography sx={{ margin: "1rem 0 0 2rem", fontSize:"2rem", fontWeight:"500", color:"#ff0080"}}>
        Thông tin liên hệ
        </Typography>
        <CardContent>
        <div style={{display:"flex", width:"100%", marginBottom:"1rem"}}>
        <FaIcons.FaBuilding style={{color: "red", fontSize:"2rem"}}/>
        <Typography sx={{ margin: "0 0 0 10px", fontSize:"1rem", fontWeight:"300", color:"black"}}>
        268 Lý Thường Kiệt, Phường 14, Quận 10, TP. HCM
        </Typography>
        </div>

        <div style={{display:"flex", width:"100%", marginBottom:"1rem"}}>
        <FaIcons.FaPhone style={{color: "00ff00", fontSize:"2rem"}}/>
        <Typography sx={{ margin: "0 0 0 10px", fontSize:"1rem", fontWeight:"300", color:"black"}}>
        038 999 5555
        </Typography>
        </div>

        <div style={{display:"flex", width:"100%"}}>
        <FaIcons.FaEnvelope style={{color: "#ffff00", fontSize:"2rem"}}/>
        <Typography sx={{ margin: "0 0 0 10px", fontSize:"1rem", fontWeight:"300", color:"black"}}>
        loca.team@hcmut.edu.vn
        </Typography>
        </div>

        </CardContent>
      </Card>
      </div>
      <Footer />
    </>
  );
}

export default Contact;