import React, { useState, useContext } from 'react';
import './Tasks.scss';
import { Context } from '../component/context/ContextApi.ts';
import Modal from '../component/modals/Modal.tsx';
import AddTask from '../component/tasks/AddTask.tsx';
import { useParams } from 'react-router';
import { IData } from '../types.ts';
import { deleteTask } from '../api/tasks.ts';
import TasksBoxes from '../component/tasks/TasksBoxes.tsx';

const Tasks = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [task, setTask] = useState(null);
    const params = useParams()
    const { data, setData } = useContext(Context)


    const handleAdd = () => {
        setTask(null)
        setIsOpen(true)
    }

    const handleDelete = async (d: IData) =>{
        try{
            await deleteTask(d.id || 0)

            const team = data.find(t => t.id == params.teamId);

            if (team) {
              const project = team.projects.find(p => p.id == params.projectId);
          
              if (project) {
                project.tasks = project.tasks.filter(task => task.id !== d.id);
                
                setData([...data]);
              }
            }

        }catch(error){
            console.log(error)
        }
    }

    const handleEdit = (d: IData) =>{
        setTask({...d})
        setIsOpen(true)
    }

    return (
        <div className="tasks-wrapper">
            <div className="tasks-container">
                <h1 className="tasks-title">Tasks</h1>
                <div className="divider"></div>
                <div className="buttons-wrapper">
                    <button className={`tasks-button join-button`} onClick={handleAdd}>add task</button>
                </div>
                <TasksBoxes handleDelete={handleDelete} handleEdit={handleEdit}/>
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={!task ? "create task" : "edit task"}>
                <AddTask setOpenModal={setIsOpen} task={task} />
            </Modal>
        </div>
    );
};

export default Tasks;
