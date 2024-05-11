import {React, useEffect} from 'react';
import { useAuth } from './AuthContext';
import '../../App.css';
import Map from '../Map/Map';
// import GoogleMap from '../Map/GoogleMap';
import { productInputs, userInputs } from "./../ucomponents/formSource"
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Vehicle from '../ucomponents/vehicle';
import History1 from '../ucomponents/history1';
import Info from '../ucomponents/info';
import History2 from '../ucomponents/history2';
import Dashboard from '../ucomponents/dashboard';
import Support from '../ucomponents/support';
import { CircularProgress } from '@mui/material';

function User() {
  
  // const [login, setLogin] = useState(false)
  const { authUser, isLoading } = useAuth();
  const router = useNavigate();
  const location = useLocation();

  // Listen to changes for loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser){
      router('/');
    }
  }, [authUser, isLoading, router]);

  // If still loading, show loading indicator
  if (isLoading) {
    return <CircularProgress color='inherit' sx={{marginLeft:'50%', marginTop: '25%'}}/>;
  }

  // If user is not authenticated, redirect to login
  if (!authUser) {
    return router('/');
  }

  return (
    <div className='app'>
      <Sidebar/>
      <div className='content'>
      <Routes location={location}>
          <Route path="/" element={<Map/>} />
          {/* <Route path="/" element={<GoogleMap/>} /> */}
          <Route path='/dashboard' element={<Dashboard/>}/>          
          <Route path='/info' element={<Info inputs={userInputs} title="User Profile"/>}/>
          {/* <Route path='vehicles' element={<Vehicle/>}/> */}
          <Route path='/car1' element={<History1/>}/>
          <Route path='/car2' element={<History2/>}/>
          <Route path='/support' element={<Support/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default User;