import React from 'react';
import "./Navs.scss"
import teams from "./../../assets/Teams.png"
import tasks from "./../../assets/Task.png"
import settings from "./../../assets/Setting 2.png"
import user from "./../../assets/User.png"
import teamsH from "./../../assets/Teams-h.png"
import taskH from "./../../assets/Task-h.png"
import menuH from "./../../assets/menu-h.png"
import menu from "./../../assets/menu.png"
import fileH from "./../../assets/file-h.png"
import file from "./../../assets/file.png"
import Nav from './Nav.tsx';
import { isUserAdmin } from '../../utils/jwtFormatter.ts';


const links = [
    {
        icon: teams,
        iconH: teamsH,
        to: "teams"
    },
    {
        icon: file,
        iconH: fileH,
        to: "projects"
    },
    {
        icon: tasks,
        iconH: taskH,
        to: "tasks"
    },

]

interface IProps {
    open: boolean
    setOpen: (open: boolean)=>void
}

const Navs:React.FC<IProps> = ({open, setOpen}) => {
    const isAdmin = isUserAdmin();
    
    return (
        <nav className="nav-wrapper">
            <div className="navs">
                {
                    links.map(link => (
                        <Nav key={link.to} {...link} />
                    ))
                }
                <div className="divider"></div>
                <Nav onClick={()=>setOpen(!open)} className={`menu ${open ? "active" : ""}`} icon={menu} iconH={menuH} isLink={false}/>
                {isAdmin && (
                    <Nav to="/admin" icon={teams} iconH={teamsH} />
                )}
            </div>
            <div className="navs-settings">
                <Nav to={"settings"} icon={settings}/>
                <Nav to={"profile"} icon={user} className="user"/>
            </div>
        </nav>
    )
}

export default Navs