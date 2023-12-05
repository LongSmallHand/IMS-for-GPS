import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };

    useEffect(() => {
        showButton();
      }, []);

    window.addEventListener('resize', showButton);

  return (
    <>
        <nav className='navibar'>
            <div className='navibar-container'>
                <Link to="/" className='navibar-logo' onClick={closeMobileMenu}>
                    LOCA
                </Link>

                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : "fas fa-bars"} />
                </div>

                <ul className={click ? 'navi-menu active':'navi-menu'}>
                    <li className='navi-item'>
                        <Link to="/about-us" className='navi-links' onClick={closeMobileMenu}>
                            Về Chúng Tôi
                        </Link>
                    </li>
                    <li className='navi-item'>
                        <Link to="/services" className='navi-links' onClick={closeMobileMenu}>
                            Tính Năng
                        </Link>
                    </li>
                    <li className='navi-item'>
                        <Link to="/contact" className='navi-links' onClick={closeMobileMenu}>
                            Liên Hệ
                        </Link>
                    </li>
                    <li className='navi-btn'>
                        {button ? (
                        <div className='btn-link'>
                            <Button buttonStyle='btn--outline' link='/sign-up'>
                            Đăng Ký
                            </Button>
                        </div>
                        ) : (
                        <div className='btn-link'>
                            <Button 
                            buttonStyle='btn--outline' buttonSize='btn--mobile'
                            onClick={closeMobileMenu} link='/sign-up'> 
                            Đăng Ký 
                            </Button>
                        </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    </>
  );
}

export default Navbar;