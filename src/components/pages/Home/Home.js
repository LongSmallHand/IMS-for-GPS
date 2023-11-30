import React from 'react';
import Section from '../../Section/Section';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import Banner from '../../Banner/Banner';
import {Obj1, Obj2} from './Data_Home'

import '../../../App.css';


function Home() {
  return (
    <>
      <Navbar />
      <Section />
      <Banner {...Obj1} />
      <Banner {...Obj2} />
      <Footer />
    </>
  );
}

export default Home;