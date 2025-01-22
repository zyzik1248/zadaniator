import React from 'react';
import "./Navs.scss"
import clock from "./../../assets/Clock.png"
import teams from "./../../assets/Teams.png"
import tasks from "./../../assets/Task.png"
import feedback from "./../../assets/Feedback.png"
import settings from "./../../assets/Setting 2.png"
import user from "./../../assets/User.png"
import clockH from "./../../assets/Clock-h.png"
import teamsH from "./../../assets/Teams-h.png"
import taskH from "./../../assets/Task-h.png"
import feedbackH from "./../../assets/Feedback-h.png"
import Nav from './Nav.tsx';


const links = [
    {
        icon: clock,
        iconH: clockH,
        to: "calendar"
    },
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
    {
        icon: feedback,
        iconH: feedbackH,
        to: "feedback"
    }
]

interface IProps {
    open: boolean
    setOpen: (open: boolean)=>void
}

const Navs:React.FC<IProps> = ({open, setOpen}) => {
    return (
        <nav className="nav-wrapper">
            <div className="navs">
                {
                    links.map(link => (
                        <Nav key={link.to} {...link} />
                    ))
                }
                <div className="divider"></div>
                <Nav onClick={()=>setOpen(!open)} className={`${open ? "active" : ""}`} icon={clock} iconH={clockH} to="menu" isLink={false}/>
            </div>
            <div className="navs-settings">
                <Nav to={"settings"} icon={settings}/>
                <Nav to={"profile"} icon={user} className="user"/>
            </div>
        </nav>
    )
}

export default Navs