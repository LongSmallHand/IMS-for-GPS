import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import './Banner.css';

function Banner({
  lightBg, topLine, lightText, lightTextDesc, headline, description, 
  buttonLabel, buttonLink, img, alt, imgStart
}) {
  return (
    <>
      <div className={lightBg ? 'section' : 'section darkBg'}>
        <div className='container'>
          <div
            className='row home-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='textWrapper'>
                <div className='top-line'>{topLine}</div>
                <h1 className={lightText ? 'heading' : 'heading dark'}>
                  {headline}
                </h1>
                <p
                  className={ lightTextDesc ? 'subtitle' : 'subtitle dark'}
                >
                  {description}
                </p>
                <Link to={buttonLink}>
                  <Button 
                  sx={{
                    marginTop:"1rem", 
                    padding:"0.8rem 2rem",
                    fontSize:"1rem",
                    color:"#ffffff",
                    backgroundColor:"#276afb",
                    borderRadius:"10px",
                    '&:hover':{backgroundColor:"#f00946", transition:"all 0.2s ease-out"}
                  }}
                  >
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className='col'>
              <div className='imgWrapper'>
                <img src={img} alt={alt} className='home-img' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;