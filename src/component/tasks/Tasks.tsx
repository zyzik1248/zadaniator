import React from 'react';
import Card from '../cards/Card.tsx';
import "./Tasks.scss"
import TasksCategory from './TasksCategory.tsx';

interface IProps {
    type?: "column" | "row"
}

const Tasks:React.FC<IProps> = ({type = "column"}) => {
    return (
        <Card className={`tasks ${type == "row" ? "tasks-row" : "tasks-column"}`} title="Tasks">
            <div className="tasks-container">
                <TasksCategory name="Urgent"/>
            </div>

        </Card>
    )
}

export default Tasks