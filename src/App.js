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

import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import VerifyEmail from './components/pages/VerifyEmail';
import Login from './components/pages/Login'
import {useState, useEffect} from 'react'
import {AuthUserProvider} from './components/pages/AuthContext'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './components/pages/PrivateRoute'
import {Navigate} from 'react-router-dom'

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <>
      <Router>
      <AuthUserProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/about-us' exact element={<About/>} />
          <Route path='/services' exact element={<Services/>} />
          <Route path='/contact' exact element={<Contact/>} />
          {/* <Route path='/sign-up' exact element={<SignUp/>} /> */}
          
          <Route path='/register' exact element={<Register/>} />
          <Route path='/login' exact element={<Login/>} />
          <Route path='/verify-email' exact element={<VerifyEmail/>} />

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
        </AuthUserProvider>
      </Router>
    </>
  );
}

export default App;