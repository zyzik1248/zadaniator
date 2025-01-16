import React from 'react';
import "./Tasks.scss"

interface IProps {
    name?: String
}

const TasksCategory:React.FC<IProps> = ({name}) => {
    return (
        <div className="tasks-category">
            <h3 className="name">{name}</h3>
            <div className="tasks-wrapper"></div>
        </div>
    )
}

export default TasksCategory