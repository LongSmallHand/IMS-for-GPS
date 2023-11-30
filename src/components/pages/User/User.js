import React from 'react';
import '../../../App.css';
import Map from '../../Map/Map';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import Vehicle from '../../ucomponents/vehicle';
import History1 from '../../ucomponents/history1';
import Info from '../../ucomponents/info';
import History2 from '../../ucomponents/history2';
// import Mysidebar from '../../Sidebar/MySidebar';


function User() {
  return (
    <div className='app'>
      <Sidebar/>
      {/* <Mysidebar/> */}
      <main className='content'>
        <Routes>
          <Route path="/" element={<Map/>} />
          <Route path='vehicles' element={<Vehicle/>}/>
          <Route path='car1' element={<History1/>}/>
          <Route path='car2' element={<History2/>}/>
          <Route path='info' element={<Info/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default User;