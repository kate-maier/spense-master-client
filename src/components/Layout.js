import React from 'react';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="container">
            <div className='inner-container'>
                <div className='background'></div>
                <div className='wrapper'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}
