import React from 'react';
import "./Navs.scss"
import teams from "./../../assets/Teams.png"
import tasks from "./../../assets/Task.png"
import settings from "./../../assets/Setting 2.png"
import user from "./../../assets/User.png"
import teamsH from "./../../assets/Teams-h.png"
import taskH from "./../../assets/Task-h.png"
import Nav from './Nav.tsx';


const links = [
    {
        icon: teams,
        iconH: teamsH,
        to: "teams"
    },
    {
        icon: tasks,
        iconH: taskH,
        to: "tasks"
    },

]

const Navs = () => {
    return (
        <nav className="nav-wrapper">
            <div className="navs">
                {
                    links.map(link => (
                        <Nav key={link.to} {...link} />
                    ))
                }
            </div>
            <div className="navs-settings">
                <Nav to={"settings"} icon={settings}/>
                <Nav to={"profile"} icon={user} className="user"/>
            </div>
        </nav>
    )
}

export default Navs