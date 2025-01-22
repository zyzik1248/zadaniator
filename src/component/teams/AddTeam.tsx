import React, {useContext} from 'react'
import "./Teams.scss"
import { decodeJWT, randomStringBase64 } from '../../utils/index.ts'
import { createTeam } from '../../api/teams.ts'
import { Context } from '../context/ContextApi.ts'
import { IData } from '../../types.ts'
import { createProject } from '../../api/projects.ts'

interface IProps {
    setOpenModal: ()=>void
}

const AddTeam:React.FC<IProps> = ({setOpenModal}) => {
    const {data, setData} = useContext(Context)

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()

        try{
            const formData = {
                name: e.target["name"].value,
                members: [decodeJWT().user_id as number]
              }

             const resp = await createTeam(formData)
             const project = await createProject({
                name: randomStringBase64(10),
                description: "empty project",
                team: resp.id
             })
             const team: IData = {
                ...resp,
                projects: [project]
             }
             
             data.push(team)
             setData([...data])
             setOpenModal(false)
        } catch(error){
            console.log(error)
        }
    }

    return (
        <form className="add-teams" onSubmit={handleSubmit}>
            <input required placeholder="name" name="name"></input>
            <button type="submit">add</button>
        </form>
    )
}

export default AddTeam