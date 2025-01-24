import React, { useContext, useRef, useEffect } from 'react'
import "./Tasks.scss"
import { decodeJWT } from '../../utils/index.ts'
import { Context } from '../context/ContextApi.ts'
import { ITask } from '../../types.ts'
import { useParams } from 'react-router'
import { createTask, updateTask } from '../../api/tasks.ts'

interface IProps {
    setOpenModal: () => void
    title?: string
    id?: string
    description?: string
    story_points?: number
    progress: number
    created_by: number
    priority?: number
}

const AddTask: React.FC<IProps> = ({ setOpenModal, title, description, story_points, id, progress, created_by, priority }) => {
    const { data, setData } = useContext(Context)

    const ref = useRef(null)
    const params = useParams()

    useEffect(() => {
        if (ref.current) {
            ref.current["title"].value = title || ""
            ref.current["description"].value = description || ""
            ref.current["story_points"].value = story_points || 0
            ref.current["progress"].value = progress || 0
            ref.current["priority"].value = priority || 1
        }
    }, [title, description, story_points, id, priority])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const formData: ITask = {
                title: e.target["title"].value,
                project: (params as any).projectId || 0,
                description: e.target["description"].value,
                progress: ref.current["progress"].value || 0,
                story_points: e.target["story_points"].value,
                created_by: created_by || decodeJWT().user_id as number,
                priority: parseInt(ref.current["priority"].value, 10) || 1
            }

            if (!id) {
                const resp = await createTask(formData)

                const team = data.find(t => t.id == params.teamId)
                const project = team.projects.find(p => p.id == params.projectId)
                project.tasks.push(resp)
                setData(data.map((d) => (d.id == team.id ? { ...d, projects: team.projects } : { ...d })))
            } else {

                formData.id = id
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
                                    tasks: project.tasks.map(task => {
                                        if (task.id !== id) return task

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
            <input required placeholder="Enter task title" name="title" defaultValue="" id="title" className="form-input"></input>
            
            <label htmlFor="description" className="form-label">Description</label>
            <textarea required name="description" rows="4" cols="50" placeholder="Enter task description..." id="description" className="form-input"></textarea>
            
            <label htmlFor="story_points" className="form-label">Story Points</label>
            <input required min="0" type="number" placeholder="Enter story points" name="story_points" defaultValue="" id="story_points" className="form-input"></input>
            
            <label htmlFor="progress" className="form-label">Progress</label>
            <select
                className="task-progress form-input"
                name="progress"
                id="progress"
            >
                <option value={0}>To Do</option>
                <option value={1}>In Progress</option>
                <option value={2}>Done</option>
                <option value={3}>Review</option>
            </select>
            
            <label htmlFor="priority" className="form-label">Priority</label>
            <select
                className="task-priority form-input"
                name="priority"
                id="priority"
                defaultValue={priority || 1}
            >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
                <option value={4}>Critical</option>
            </select>
            
            <button type="submit" className="form-button">{id ? "Edit Task" : "Add Task"}</button>
        </form>
    )
}

export default AddTask
