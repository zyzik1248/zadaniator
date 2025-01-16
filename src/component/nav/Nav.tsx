import React from 'react';
import { NavLink } from 'react-router';

interface IProps {
    to: string,
    icon: string,
    iconH: string,
    className?: string
}

const Nav: React.Fc<IProps> = ({ to, icon, iconH, className = "" }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `nav ${className} ${isActive ? "active" : ""}`
            }
        >

            {
                iconH ?
                    <><div className="bg"></div>
                        <div className="img-wrapper">
                            <img src={icon} alt={to} />
                            <img className="img-h" src={iconH} alt={to} />
                        </div>
                        <span>{to}</span>
                    </>
                    :
                    <img src={icon} alt={to} />
            }

        </NavLink>
    )
}

export default Nav