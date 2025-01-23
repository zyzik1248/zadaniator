import React from 'react';
import "./Tasks.scss"
import { ITask } from '../../types';

interface IProps {
    task: ITask
    handleEdit: (d: ITask) => void
    handleDelete: (d: ITask) => void
}

const SingleTask: React.FC<IProps> = ({ handleEdit, handleDelete, task }) => {
    return (
        <div className="task-box">
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
            <h3 className="title">{task.title}</h3>
            <p className="description">{task.description}</p>
        </div>
    )
}

export default SingleTask