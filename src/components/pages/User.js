import React from 'react';
import '../../App.css';
import Map from '../Map/Map';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Vehicle from '../ucomponents/vehicle';
import History1 from '../ucomponents/history1';
import Info from '../ucomponents/info';
import History2 from '../ucomponents/history2';
import Dashboard from '../ucomponents/dashboard';
import Support from '../ucomponents/support';

function User() {
  return (
    <div className='app'>
      <Sidebar/>
      <div className='content'>
        <Routes>
          <Route path="/" element={<Map/>} />
          <Route path='dashboard' element={<Dashboard/>}/>          
          <Route path='info' element={<Info/>}/>
          <Route path='vehicles' element={<Vehicle/>}/>
          <Route path='car1' element={<History1/>}/>
          <Route path='car2' element={<History2/>}/>
          <Route path='support' element={<Support/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default User;