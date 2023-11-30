import React from 'react';
import { Button } from '../Button/Button';
import '../../App.css';
import './Section.css';

function Section() {
  return (
    <div className='hero-container'>
      {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
      <h1>LONA</h1>
      <p>ĐỒNG HÀNH CÙNG BẠN TRÊN MỌI CUNG ĐƯỜNG</p> 
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          link='/services'
        >
          XEM TÍNH NĂNG
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          link='/user'
          // onClick={console.log('hey')}
        >
          TRẢI NGHIỆM NGAY 
        </Button>
      </div>
    </div>
  );
}

export default Section;