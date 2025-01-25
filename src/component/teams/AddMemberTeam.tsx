import React, { useContext, useRef, useEffect } from 'react'
import "./Teams.scss"
import { updateTeam } from '../../api/teams.ts'
import { Context } from '../context/ContextApi.ts'
import { IData, IProject, ITeam, IUser } from '../../types.ts'

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
        <form ref={ref} className="add-teams" onSubmit={handleSubmit}>
            <label htmlFor="name" className="form-label" >Name</label>
            <input className="form-input" id="name" required placeholder="write name ..." name="name" defaultValue=""></input>
            <div className="button-wrapper">
                <button className="form-button" type="submit">Done</button>
            </div>
        </form>
    )
}

export default AddMemberTeam