import React, { useState } from "react";
import '../../../App.css';
import './LoginSignUp.css';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';


import user_icon from '../../Assets/user.svg'
import email_icon from '../../Assets/mail.svg'
import password_icon from '../../Assets/lock.svg'
import phone_icon from '../../Assets/phone.svg'

function LoginSignUp() {

    const [action, setAction] = useState("Sign Up");

    return (
        <div className="Login-signUp">
        <Navbar/>
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==="Login"?<div></div>:
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder="Name" />
                </div>}
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password" />
                </div>
                {/* <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="text" placeholder="Phone Number" />
                </div> */}
            </div>
            {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}> Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}> Login </div>
            </div>
        </div>
        <Footer/>
        </div>
    );
}
export default LoginSignUp;