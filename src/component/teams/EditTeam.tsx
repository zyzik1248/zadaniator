import React, { useContext, useRef, useEffect } from 'react'
import "./Teams.scss"
import { updateTeam } from '../../api/teams.ts'
import { Context } from '../context/ContextApi.ts'
import { IData, ITeam } from '../../types.ts'

interface IProps {
    setOpenModal: () => void
    team: ITeam | null
}

const EditTeam: React.FC<IProps> = ({ setOpenModal, team = { projects: null, name: null, id: null, members: null} }) => {
    const { data, setData } = useContext(Context)
    const {name, id} = team

    const ref = useRef(null)

    useEffect(
        () => {
            if (ref.current) {
                ref.current["name"].value = name || ""
            }
        }, [team]
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const formData = {
                name: e.target["name"].value || "",
                id: id || 1, 
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
        <form ref={ref} className="add-teams" onSubmit={handleSubmit}>
            <label htmlFor="name" className="form-label" >Name</label>
            <input className="form-input" id="name" required placeholder="write name ..." name="name" defaultValue=""></input>
            <div className="button-wrapper">
                <button className="form-button" type="submit">Done</button>
            </div>
        </form>
    )
}

export default EditTeam