import React, { useState, useEffect } from 'react';
import "./Tasks.scss";
import { ITask } from '../../types';
import TaskModal from './TaskModal.tsx';
import { getTaskComments } from '../../api/tasks.ts';

interface IProps {
    task: ITask;
    handleEdit: (d: ITask) => void;
    handleDelete: (d: ITask) => void;
}

const SingleTask: React.FC<IProps> = ({ handleEdit, handleDelete, task }) => {
    const [comments, setComments] = useState([])

    const fetch = async () => {
        try{
            const resp = await getTaskComments(task.id!);
            setComments([...resp])
        } catch (error){
            console.log(error)
        }
    };

    useEffect(()=>{
        fetch()
    }, [])

    const [isModalOpen, setModalOpen] = useState(false);

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

    const toggleModal = () => setModalOpen(!isModalOpen);

    return (
        <>
            <div className={`task-box ${getPriorityClass(task.priority)}`} onClick={toggleModal}>
                {
                    (handleEdit || handleDelete) &&
                    <div className="task-editor">
                        {
                            handleEdit &&
                            <button className="ed" onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(task);
                            }}>
                                <span className="material-symbols-outlined pencil">
                                    edit
                                </span>
                            </button>
                        }
                        {
                            handleDelete &&
                            <button className="ed" onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(task);
                            }}>
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
                <div className="comments-btn-wtapper">
                    <button className="comments-btn" disabled={!comments.length} type="button">({comments.length})</button>
                </div>
            </div>

            {isModalOpen && (
                <TaskModal
                    task={task}
                    onClose={toggleModal}
                    onApprove={(id, approved) => {
                        console.log(`Task ${id} approval status: ${approved}`);
                    }}
                    onAddComment={(id, comment) => {
                    }}
                    onSubmit ={()=>{
                        fetch()
                        console.log("jijijij")
                    }}
                />
            )}
        </>
    );
};

export default SingleTask;
