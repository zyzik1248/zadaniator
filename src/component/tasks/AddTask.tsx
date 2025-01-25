import React, { useContext, useRef, useEffect } from 'react'
import "./Tasks.scss"
import { decodeJWT } from '../../utils/index.ts'
import { Context } from '../context/ContextApi.ts'
import { ITask } from '../../types.ts'
import { useParams } from 'react-router'
import { createTask, updateTask } from '../../api/tasks.ts'

interface IProps {
    setOpenModal: () => void
    task: ITask | null
}

const AddTask: React.FC<IProps> = ({ setOpenModal, task }) => {
    const { data, setData } = useContext(Context)

    const ref = useRef(null)
    const params = useParams()

    useEffect(() => {
        if (ref.current) {
            ref.current["title"].value = task?.title || ""
            ref.current["description"].value = task?.description || ""
            // ref.current["story_points"].value = story_points || 0
            ref.current["progress"].value = task?.progress || 0
            ref.current["priority"].value = task?.priority || 1
        }
    }, [task])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const formData: ITask = {
                title: e.target["title"].value,
                project: (params as any).projectId || 0,
                description: e.target["description"].value,
                progress: ref.current["progress"].value || 0,
                story_points: 0,
                created_by: task?.created_by || decodeJWT().user_id as number,
                priority: parseInt(ref.current["priority"].value, 10) || 1
            }

            if (!task?.id) {
                const resp = await createTask(formData)
                const team = data.find(t => t.id == params.teamId)
                const project = team.projects.find(p => p.id == params.projectId)
                project.tasks.push(resp)
                setData(data.map((d) => (d.id == team.id ? { ...d, projects: team.projects } : { ...d })))
            } else {
                formData.id = task.id
                console.log(formData)
                await updateTask({ ...formData })

                setData(
                    data.map(team => {
                        if (team.id != params.teamId) return team

                        return {
                            ...team,
                            projects: team.projects.map(project => {
                                if (project.id != params.projectId) return project

                                return {
                                    ...project,
                                    tasks: project.tasks.map(t => {
                                        if (t.id !== task.id) return t

                                        return {
                                            ...formData
                                        }
                                    }),
                                }
                            }),
                        }
                    })
                )
            }

            setOpenModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form ref={ref} className="add-tasks" onSubmit={handleSubmit}>
            <label htmlFor="title" className="form-label">Task Title</label>
            <input required placeholder="write title ..." name="title" defaultValue="" id="title" className="form-input"></input>

            <label htmlFor="description" className="form-label">Description</label>
            <textarea required name="description" rows="4" cols="50" placeholder="Write description..." id="description" className="form-input"></textarea>

            <label className="form-label">Progress</label>
            <div className="radio-form">
                <div className="radio-input">
                    <input id="to-do" type="radio" name="progress" className="form-input" value="0"></input>
                    <label htmlFor="to-do" className="form-label">To do</label>
                </div>
                <div className="radio-input">
                    <input id="in-progress" type="radio" name="progress" className="form-input" value="1"></input>
                    <label htmlFor="in-progress" className="form-label">progress</label>
                </div>
                <div className="radio-input">
                    <input id="in-progress" type="radio" name="progress" className="form-input" value="2"></input>
                    <label htmlFor="done" className="form-label">Done</label>
                </div>
                <div className="radio-input">
                    <input id="in-progress" type="radio" name="progress" className="form-input" value="3"></input>
                    <label htmlFor="review" className="form-label">Review</label>
                </div>
            </div>

            <label htmlFor="progress" className="form-label">Priority</label>
            <div className="radio-form">
                <div className="radio-input">
                    <input id="low" type="radio" name="priority" className="form-input" value="0"></input>
                    <label htmlFor="low" className="form-label">Low</label>
                </div>
                <div className="radio-input">
                    <input id="Medium" type="radio" name="priority" className="form-input" value="1"></input>
                    <label htmlFor="Medium" className="form-label">Medium</label>
                </div>
                <div className="radio-input">
                    <input id="High" type="radio" name="priority" className="form-input" value="2"></input>
                    <label htmlFor="High" className="form-label">High</label>
                </div>
                <div className="radio-input">
                    <input id="Critical" type="radio" name="priority" className="form-input" value="3"></input>
                    <label htmlFor="Critical" className="form-label">Critical</label>
                </div>
            </div>
            <div className="button-wrapper">
                <button type="submit" className="form-button">Done</button>
            </div>
        </form>
    )
}

export default AddTask
