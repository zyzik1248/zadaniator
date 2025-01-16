import React from 'react';
import "./Tasks.scss"

interface IProps {
    name?: String
}

const TasksCategory: React.FC<IProps> = ({ name }) => {
    return (
        <div className="tasks-category">
            <h3 className="name">{name}</h3>
            <p className="task-wrapper">
                No tasks...
            </p>
        </div>
    )
}

export default TasksCategory