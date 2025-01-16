import React from 'react';
import "./Cards.scss"

interface IProps {
    title: string,
    children: React.node
    calssName?: string
}

const Card:React.FC<IProps> = ({title, children, className = ""}) => {
    return (
        <div className={`card ${className}`}>
            <h3 className="title">{title}</h3>
            <div className="divider"></div>
            <div className="card-content">
                {children}
            </div>
        </div>
    )
}

export default Card