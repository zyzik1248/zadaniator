import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';
import './Layout.scss';
import logo from "./../../assets/logo.png"
import Navs from '../nav/Navs.tsx';
import PrivateRoute from '../routes/PrivateRoute.tsx';
import SideMenu from '../nav/SideMenu.tsx';

const Layout = () => {
    const [open, setOpen] = useState(true)


    return (
        <div>
            <PrivateRoute>
                <header className="header">
                    <Link to="/"><img className="logo" src={logo} alt="Logo" /></Link>
                    <Link to="/"><h1 className="title">Zadaniator</h1></Link>
                </header>
                <div className="content">
                    <div className="all-navs">
                        <SideMenu open={open} />
                        <Navs open={open} setOpen={setOpen} />
                    </div>
                    <div className="wrapper">
                        <div className="box">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </PrivateRoute>
        </div>
    )
}

export default Layout