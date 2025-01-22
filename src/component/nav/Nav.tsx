import React from 'react';
import { NavLink } from 'react-router';

interface IProps {
    to: string,
    icon: string,
    iconH: string,
    className?: string,
    isLink?: boolean
    onClick: ()=>void
}

const Nav: React.Fc<IProps> = ({ to, icon, iconH, onClick, isLink=true, className = "" }) => {
    return (
        <>
            {isLink ?
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

                </NavLink> :
                <div
                    to={to}
                    className={`nav ${className}`}
                    onClick = {()=>onClick && onClick()}
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

                </div>

            }
        </>
    )
}

export default Nav