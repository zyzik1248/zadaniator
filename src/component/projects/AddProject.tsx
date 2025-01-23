import React, { useContext, useRef, useEffect } from 'react'
import "./Project.scss"
import { Context } from '../context/ContextApi.ts'
import { IProject} from '../../types.ts'
import { useParams } from 'react-router'
import { createProject, updateProject } from '../../api/projects.ts'

interface IProps {
    setOpenModal: () => void
    id?:number
    name?: string
    description?: string
}

const AddProject: React.FC<IProps> = ({ setOpenModal, name, description, id }) => {
    const { data, setData } = useContext(Context)

    const ref = useRef(null)
    const params = useParams()

    useEffect(
        () => {
            if (ref.current) {
                ref.current["name"].value = name || ""
                ref.current["description"].value = description || ""
            }
        }, [name, description, id]
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
                            projects: team.projects.map(project => {
                                if (project.id != id) return project;
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
            <input required placeholder="name" name="name" defaultValue=""></input>
            <textarea required name="description" rows="4" cols="50" placeholder="description..."></textarea>            
            <button type="submit">{id ? "edit" : "add"}</button>
        </form>
    )
}

export default AddProject