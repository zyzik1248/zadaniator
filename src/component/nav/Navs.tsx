import React from 'react';
import "./Navs.scss"
import teams from "./../../assets/Teams.png"
import tasks from "./../../assets/Task.png"
import user from "./../../assets/User.png"
import teamsH from "./../../assets/Teams-h.png"
import taskH from "./../../assets/Task-h.png"
import menuH from "./../../assets/menu-h.png"
import menu from "./../../assets/menu.png"
import fileH from "./../../assets/file-h.png"
import file from "./../../assets/file.png"
import Nav from './Nav.tsx';
import { isUserAdmin } from '../../utils/jwtFormatter.ts';
import { useNavigate } from 'react-router';


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

    const navigate = useNavigate();

    const logout = () =>{
        if (localStorage.getItem('authToken')) {
            localStorage.removeItem('authToken');
            navigate(`/login`)
        }
    }
    
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
                <Nav isLink={false} onClick={logout} icon={user}/>
            </div>
        </nav>
    )
}

export default Navs