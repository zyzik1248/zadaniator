import React from 'react';
import "./Tasks.scss"
import { ITask } from '../../types';
import SingleTask from './SingleTask.tsx';

interface IProps {
    name?: String
    tasks: ITask[]
    handleDelete: (d: ITask)=>void
    handleEdit: (d: ITask)=>void
}

const TasksCategory: React.FC<IProps> = ({ name, tasks=[], handleEdit, handleDelete }) => {
    return (
        <div className="tasks-category">
            <h3 className="name">{name}</h3>
            {
                tasks &&
                tasks.map((task: ITask, index)=>(
                    <SingleTask key={task.id} task={task} handleEdit={handleEdit} handleDelete={handleDelete} />
                ))
            }
        </div>
    )
}

export default TasksCategory