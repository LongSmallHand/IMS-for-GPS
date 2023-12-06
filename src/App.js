import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import About from './components/pages/About';
import Services from './components/pages/Services';
import Contact from './components/pages/Contact';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home/Home';
import User from './components/pages/User';
import Admin from './components/pages/Admin';
import './App.css';

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
          <Route path='/user/*' element={<User/>}>
            <Route path='dashboard'/>
            <Route path='info'/>
            <Route path='vehicles'/>
            <Route path='car1'/>
            <Route path='car2'/>
            <Route path='support'/>
          </Route>
          <Route path='/admin/*' element={<Admin/>}>
            <Route path='team'/>          
            <Route path='device'/>
            <Route path='invoices'/>
            <Route path='form'/>
            <Route path='line'/>
            <Route path='faq'/>
            <Route path="calendar" />
            <Route path="geography"/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;