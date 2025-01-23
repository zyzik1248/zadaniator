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

const AddMemberTeam: React.FC<IProps> = ({ setOpenModal, users = [], projects = [], name, id, members }) => {
    const { data, setData } = useContext(Context)

    const ref = useRef(null)

    useEffect(
        () => {
            if (ref.current) {
                ref.current["name"].value = ""
            }
        }, [users, projects, name, id]
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const user = users.find((user: IUser) => user.username === ref.current["name"].value);
            console.log(user)
            if (user) {
                members.push((user as IUser).id)

                const formData = {
                    name,
                    id,
                    members
                } as ITeam

                await updateTeam(formData)

                const team = data.map((team: IData) =>
                    team.id === id ? { ...team, members: formData.members } : team
                );

                setData([...team])
            }

            setOpenModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form ref={ref} className="edit-teams" onSubmit={handleSubmit}>
            <input required placeholder="name" name="name" defaultValue=""></input>
            <button type="submit">add</button>
        </form>
    )
}

export default AddMemberTeam