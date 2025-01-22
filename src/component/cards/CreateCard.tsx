import React from 'react';
import "./Cards.scss"
// import clock from "./../../assets/Clock.png"

interface IProps {
    className?: string
    title: string
    onClick: ()=>void
}

const CreateCard: React.FC<IProps> = ({ title, className = "", onClick }) => {
    return (
        <div onClick={onClick} className={`create-card ${className}`}>
            <span className="material-symbols-outlined plus">
                add_circle
            </span>
            <p className="title">{title}</p>
        </div>
    )
}

export default CreateCard