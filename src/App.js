import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import About from './components/pages/About/About';
import Services from './components/pages/Services/Services';
import Contact from './components/pages/Contact/Contact';
import SignUp from './components/pages/SignUp/SignUp';
import Home from './components/pages/Home/Home';
import User from './components/pages/User/User';

import './App.css';
import MySidebar from './components/Sidebar/MySidebar';
import Vehicle from './components/ucomponents/vehicle';
// import Sidebar from './components/Sidebar/Sidebar';
// import Map from './components/Map/Map';
import Info from './components/ucomponents/info';
import History1 from './components/ucomponents/history1';
import History2 from './components/ucomponents/history2';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDM9CFpbE9reEQ36WpKiBQtp9Fcezj9bE8",
//   authDomain: "gps-app-85f3f.firebaseapp.com",
//   projectId: "gps-app-85f3f",
//   storageBucket: "gps-app-85f3f.appspot.com",
//   messagingSenderId: "1040905916162",
//   appId: "1:1040905916162:web:db0e9bbe0f474c013c7c1b",
//   measurementId: "G-VSM5Z30QQC"
// };

// // Initialize Firebase

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/about-us' exact element={<About/>} />
          <Route path='/services' exact element={<Services/>} />
          <Route path='/contact' exact element={<Contact/>} />
          <Route path='/sign-up' exact element={<SignUp/>} />
          <Route path='/sidebar' exact element={<MySidebar/>} />
          <Route path='/user' element={<User/>}>
            <Route path='vehicles' element={<Vehicle/>} />
            <Route path='info' element={<Info/>} />
            <Route path='car1' element={<History1/>} />
            <Route path='car2' element={<History2/>} />
          </Route>
          {/* <Route path='/user' element={<Sidebar/>}>
            <Route index element={<Map/>} />
            <Route path='vehicles' element={<Vehicle/>} />
          </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;