import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { checkAuth, getProjects, getTeams } from '../../api/index.ts';
import { IData, IProject, ITeam } from '../../types.ts';
import { decodeJWT } from '../../utils/jwtFormatter.ts';
import { Context } from '../context/ContextApi.ts';
import { createTeam } from '../../api/teams.ts';
import { randomStringBase64 } from '../../utils/random.ts';
import { createProject } from '../../api/projects.ts';
import Loader from '../../components/Loader.tsx';

interface IProps {
    children: React.node
}

const PrivateRoute: React.FC<IProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)
    const [data, setData] = useState<IData[]>([])
    const [loading, setLoading] = useState(true)

    const params = useParams();
    const navigate = useNavigate()

    const fetch = async () => {
        try {
            await checkAuth()

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

            if (data.length == 0) {
                const resp = await createTeam({members: [user], name: randomStringBase64(10)})
                const project = await createProject({
                    name: randomStringBase64(10),
                    description: "empty project",
                    team: resp.id
                })

                resp.projects = []
                resp.projects.push(project)

                setData(resp)
            } else {
                setData(data)

                const firstTeamWithProjects = data.find((data: IData) => data.projects && data.projects.length > 0);
                const teamId = firstTeamWithProjects.id
                const projectId = firstTeamWithProjects.projects[0].id

                if (params) {
                    const team = data.find((team: IData) => team.id == params.teamId)
                    if (!team) {
                        navigate(`/${teamId}/${projectId}`)
                        return
                    }
                    const project = team.projects.find((project: IProject) => project.id == params.projectId)
                    if (!project) {
                        navigate(`/${teamId}/${projectId}`)
                    }
                }
            }

            setIsAuth(true)
        } catch (error) {
            console.log(error)
            navigate('/login')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    if (loading) {
        return <Loader text="Wczytywanie danych..." />
    }

    return (
        <>
            {isAuth &&
                <Context.Provider value={{ data: data, setData: setData }}>
                    {children}
                </Context.Provider>
            }
        </>
    )
};

export default PrivateRoute;
