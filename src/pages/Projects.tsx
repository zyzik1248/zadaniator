import React, { useState, useContext } from 'react';
import './Teams.scss';
import { Context } from '../component/context/ContextApi.ts';
import { IData, IProject, ITeam } from '../types.ts';
import Modal from '../component/modals/Modal.tsx';
import Table from '../component/table/Table.tsx';
import { useParams } from 'react-router';
import AddProject from '../component/projects/AddProject.tsx';
import { deleteProject } from '../api/projects.ts';

const Teams = () => {
    const { data, setData } = useContext(Context)
    const [isOpen, setIsOpen] = useState(false)
    const [project, setProject] = useState<ITeam | undefined>()

    const params = useParams();

    const handleAdd = () => {
        setIsOpen(true)
    }

    const handleEdit = (d: IData) => {
        setProject(d)
        setIsOpen(true)
    }

    const handleDelete = async (d: IData) => {
        try {
            await deleteProject(d.id || 0)
            setData(data.map(team =>
                team.id == params.teamId
                    ? { ...team, projects: team.projects.filter(project => project.id != d.id) }
                    : team
            ))

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="teams-wrapper">
            <div className="teams-container">
                <h1 className="teams-title">Projects</h1>
                <div className="divider"></div>
                <div className="buttons-wrapper">
                    <button className={`teams-button join-button`} onClick={handleAdd}>add project</button>
                </div>
                <Table
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    body={data
                        .find(team => team.id == params.teamId).projects
                        .sort((a: IData, b: IData) => (a.id || 0) - (b.id || 0))
                        .map((data: IProject) => {
                            return {
                                id: data.id,
                                name: data.name,
                                description: data.description
                            };
                        })
                    }
                    noDelete={[params.projectId]}
                />
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={project ? "edit project" : "create project"}>
                    <AddProject setOpenModal={setIsOpen} {...project} />
                </Modal>
            </div>
        </div>
    );
};

export default Teams;
