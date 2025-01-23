import React, { useContext, useRef, useEffect } from 'react'
import "./Teams.scss"
import { decodeJWT, randomStringBase64 } from '../../utils/index.ts'
import { createTeam, updateTeam } from '../../api/teams.ts'
import { Context } from '../context/ContextApi.ts'
import { IData, IProject, ITeam, IUser } from '../../types.ts'
import { createProject } from '../../api/projects.ts'

interface IProps {
    setOpenModal: () => void
    users: IUser[],
    projects: IProject[]
    name: string
    id: string
    members: number[]
}

const EditTeam: React.FC<IProps> = ({ setOpenModal, users = [], projects = [], name, id, members }) => {
    const { data, setData } = useContext(Context)

    const ref = useRef(null)

    useEffect(
        () => {
            if (ref.current) {
                ref.current["name"].value = name
            }
        }, [users, projects, name, id]
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const formData = {
                name: e.target["name"].value,
                id, 
                members: data.find(d=>d.id == id).members
            } as ITeam

            await updateTeam(formData)
            const team  = data.map((team : IData) =>
                team.id === id ? { ...team, name: e.target["name"].value} : team
              );

            setData([...team])
            setOpenModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form ref={ref} className="edit-teams" onSubmit={handleSubmit}>
            <input required placeholder="name" name="name" defaultValue=""></input>
            <button type="submit">edit</button>
        </form>
    )
}

export default EditTeam