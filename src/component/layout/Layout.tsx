import React from 'react';
import { Link, Outlet } from 'react-router';
import './Layout.scss';
import logo from "./../../assets/logo.png"
import Navs from '../nav/Navs.tsx';

const Layout = () => {
    return (
        <div>
            <header className="header">
                <Link to="/"><img className="logo" src={logo} alt="Logo" /></Link>
                <Link to="/"><h1 className="title">Zadaniator</h1></Link>
            </header>
            <div className="content">
                <Navs />
                <div className="wrapper">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout