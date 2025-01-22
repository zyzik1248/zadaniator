import React, { useContext } from 'react';
import './Navs.scss';
import teamsH from "./../../assets/Teams-h.png"
import clockH from "./../../assets/Clock-h.png"
import clock from "./../../assets/Clock.png"
import { IData } from '../../types';
import { Context } from '../context/ContextApi.ts';
import { NavLink } from 'react-router';

interface IProps {
    open?: boolean
    data?: IData[]
}

const SideMenu: React.FC<IProps> = ({ open }) => {
    const data = useContext(Context).data;

    return (
        <div className={`side-navs ${open ? "open" : ""}`}>
            {
                data.length == 0 ?
                    <p className="empty-info">No teams available. Add a team.</p> :
                    <>
                        {data.map((team: IData) => (
                            <div key={team.id}>
                                <div className="team-nav">
                                    <img src={teamsH} />
                                    <p>{team.name}</p>
                                </div>
                                <div className="project-navs">
                                    {
                                        team.projects.map((project) => (
                                            <NavLink to={`/${team.id}/${project.id}`}                     
                                            className={({ isActive }) =>
                                                `project-nav ${isActive ? "active" : ""}`
                                            } key={project.id}>
                                                <div className="img-wrapper">
                                                    <img className="im" src={clockH} />
                                                    <img className="im-h" src={clock} />
                                                </div>
                                                <p>{project.name}</p>
                                            </NavLink>
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </>
            }
        </div>
    )
}

export default SideMenu
