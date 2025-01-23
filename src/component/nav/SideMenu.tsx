import React, { useContext } from 'react';
import './Navs.scss';
import teamsH from "./../../assets/Teams-h.png"
import fileH from "./../../assets/file-h.png"
import file from "./../../assets/file.png"
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
            {data.sort((a : IData, b: IData) => (a.id || 0) - (b.id || 0))
            .map((team : IData)=>(
                {
                    ...team,
                    projects: team.projects.sort((a, b) => (a.id || 0) - (b.id || 0))
                }
            ))
            .map((team: IData) => (
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
                                        <img className="im" src={fileH} />
                                        <img className="im-h" src={file} />
                                    </div>
                                    <p>{project.name}</p>
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SideMenu
