import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className='bg-[#0f0f0f] text-white min-h-screen'>
            <Navbar />
            <Sidebar />
            <div className="p-4 sm:ml-64 pt-20">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
