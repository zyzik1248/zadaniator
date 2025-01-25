import React, { useContext, useRef, useEffect } from 'react'
import "./Project.scss"
import { Context } from '../context/ContextApi.ts'
import { IProject } from '../../types.ts'
import { useParams } from 'react-router'
import { createProject, updateProject } from '../../api/projects.ts'

interface IProps {
    setOpenModal: () => void
    project?: IProject
}

const AddProject: React.FC<IProps> = ({ setOpenModal, project = {name: null, description: null, id: null} }) => {
    const {name, description, id} = project
    const { data, setData } = useContext(Context)

    const ref = useRef(null)
    const params = useParams()

    useEffect(
        () => {
            if (ref.current) {
                ref.current["name"].value = name || ""
                ref.current["description"].value = description || ""
            }
        }, [project]
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const formData: IProject = {
                name: e.target["name"].value,
                team: (params as any).teamId || 0,
                description: e.target["description"].value,
            }

            if (!id) {
                const resp = await createProject(formData)

                const team = data.find(t => t.id == params.teamId);
                team.projects.push(resp)
                setData(data.map((d) => (d.id == team.id ? { ...d, projects: team.projects } : { ...d })))
            } else {

                formData.id = id
                await updateProject({ ...formData })

                setData(
                    data.map(team => {
                        if (team.id != params.teamId) return team;

                        return {
                            ...team,
                            projects: team.projects.map(pr => {
                                if (pr.id != id) return pr;
                                return {
                                    ...formData
                                }
                            }),
                        };
                    })
                );
            }

            setOpenModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form ref={ref} className="add-tasks" onSubmit={handleSubmit}>
            <label htmlFor="name" className="form-label">Name</label>
            <input required placeholder="write name ..." name="name" defaultValue="" id="name" className="form-input"></input>
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-input" id="description" required name="description" rows="4" cols="50" placeholder="write description..."></textarea>
            <div className="button-wrapper">
                <button className="form-button" type="submit">Done</button>
            </div>
        </form>
    )
}

export default AddProject