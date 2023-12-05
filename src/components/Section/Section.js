import React from 'react';
// import { Button } from '../Button/Button';
import '../../App.css';
import './Section.css';
import { Button } from '@mui/material';


function Section() {
  return (
    <div className='hero-container'>
      {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
      <h1>LOCA</h1>
      <p>ĐỒNG HÀNH CÙNG BẠN TRÊN MỌI CUNG ĐƯỜNG</p> 
      <div className='hero-btns'>
        <div className='btn'>
        <Button
          sx={{
            padding:"0.8rem 1.5rem",
            marginBottom:"0.5rem",
            fontSize:"1rem",
            fontWeight:"heavy",
            backgroundColor:"transparent",
            color:"#fff",
            border:"1px solid #fff",
            transition:"all 0.3s ease-out",
            width:"100%",
            '&:hover':{
              backgroundColor:"seashell",
              color:"black",
            }            
          }}
          href='/services'
        >
          XEM TÍNH NĂNG
        </Button>
        </div>
        <div className='btn'>
        <Button
        sx={{
            padding:"0.8rem 1.5rem",
            marginBottom:"0.5rem",
            fontSize:"1rem",
            fontWeight:"heavy",
            backgroundColor:"seashell",
            color:"#242424",
            border:"1px solid #fff",
            transition:"all 0.3s ease-out",
            width:"100%",
            '&:hover':{
              backgroundColor:"#242424",
              color:"white",
            }
          }}
          href='/user'
        >
          TRẢI NGHIỆM NGAY 
        </Button>
        </div>
      </div>
    </div>
  );
}

export default Section;