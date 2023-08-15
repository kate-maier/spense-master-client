import React from 'react';
import logoTop from '../img/logo1.svg';
import logoBottom from '../img/logo2.svg'
import { Link } from 'react-router-dom';

export default function Logotype() {
  return (
    <>
          <Link className='logo-link' to="/">
            <div className='logo'>
              <div className="logo-img">
                <img className='logo-top' src={logoTop} alt="logo" />
                <img className='logo-bottom' src={logoBottom} alt="logo" />
              </div>
              <span className='logo-text'>SpenseMaster</span>
            </div>
          </Link>
    
    </>
  )
}

