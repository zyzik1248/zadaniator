import React from 'react';
import "./Tasks.scss";
import { ITask } from '../../types';

interface IProps {
    task: ITask;
    handleEdit: (d: ITask) => void;
    handleDelete: (d: ITask) => void;
}

const SingleTask: React.FC<IProps> = ({ handleEdit, handleDelete, task }) => {
    const getPriorityClass = (priority: number) => {
        switch (priority) {
            case 4:
                return "priority-critical";
            case 3:
                return "priority-high";
            case 2:
                return "priority-medium";
            case 1:
            default:
                return "priority-low";
        }
    };

    return (
        <div className={`task-box ${getPriorityClass(task.priority)}`}>
            {
                (handleEdit || handleDelete) &&
                <div className="task-editor">
                    {
                        handleEdit &&
                        <button className="ed" onClick={() => handleEdit(task)}>
                            <span className="material-symbols-outlined pencil">
                                edit
                            </span>
                        </button>
                    }
                    {
                        handleDelete &&
                        <button className="ed" onClick={() => handleDelete(task)}>
                            <span className="material-symbols-outlined trash">
                                delete
                            </span>
                        </button>
                    }
                </div>
            }
            {task.priority === 4 && <span className="critical-icon">⚠️</span>}
            <h3 className="title">{task.title}</h3>
            <p className="description">{task.description}</p>
        </div>
    );
};

export default SingleTask;
