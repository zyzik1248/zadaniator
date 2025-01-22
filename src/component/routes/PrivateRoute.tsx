import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { checkAuth, getProjects, getTeams } from '../../api/index.ts';
import { IData, IProject, ITeam } from '../../types.ts';
import { decodeJWT } from '../../utils/jwtFormatter.ts';
import { Context } from '../context/ContextApi.ts';

interface IProps {
    children: React.node
}

const PrivateRoute: React.FC<IProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)
    const [data, setData] = useState<IData[]>([])

    const params = useParams();

    const navigate = useNavigate()

    const fetch = async () => {
        try {
            await checkAuth()
            setIsAuth(true)

            const user = decodeJWT().user_id as number
            const resp = await getTeams()
            const teams = resp.filter((resp: ITeam) => resp.members.includes(user))
            const projects = await getProjects()

            const data = teams.map((team: ITeam) => (
                {
                    ...team,
                    projects: projects.filter((project: IProject) => project.team == team.id)
                }
            ))

            setData(data)

            const firstTeamWithProjects = data.find((data: IData) => data.projects && data.projects.length > 0);
            const teamId = firstTeamWithProjects.id
            const projectId = firstTeamWithProjects.projects[0].id

            if(params){
                const team = data.find((team: IData) => team.id == params.teamId)
                if(!team){
                    navigate(`/${teamId}/${projectId}`)
                    return
                }
                const project = team.projects.find((project: IProject) => project.id == params.projectId)
                if(!project){
                    navigate(`/${teamId}/${projectId}`)
                }
            }
        } catch (error) {
            console.log(error)
            navigate("/login")
        }

    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            {isAuth &&
                <Context.Provider value={{ data: data, setData: setData }}>
                    {
                        children
                    }
                </Context.Provider>
            }
        </>
    )
};

export default PrivateRoute;
