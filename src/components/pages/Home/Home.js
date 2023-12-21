import {React, useEffect, useState} from 'react';
import Section from '../../Section/Section';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import Banner from '../../Banner/Banner';
import { useNavigate } from "react-router-dom";
import {Obj1, Obj2} from './Data_Home'
import '../../../App.css';
import { useAuth } from '../AuthContext';
import { CircularProgress } from '@mui/material';

function Home() {
  const [login, setLogin] = useState(false)
  const { authUser, isLoading } = useAuth();
  const router = useNavigate();

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && authUser){
      router('/user');
    }
  }, [authUser, isLoading]);

  return ((isLoading || (!isLoading && !!authUser)) ? 
  <CircularProgress color='inherit' sx={{marginLeft:'50%', marginTop: '25%'}}/>
  :
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