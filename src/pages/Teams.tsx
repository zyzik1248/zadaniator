import React, { useState, useContext, useEffect } from 'react';
import './Teams.scss';
import { Context } from '../component/context/ContextApi.ts';
import { IData, ITeam } from '../types.ts';
import Modal from '../component/modals/Modal.tsx';
import AddTeam from '../component/teams/AddTeam.tsx';
import EditTeam from '../component/teams/EditTeam.tsx';
import { getUsers } from '../api/users.ts';
import { decodeJWT } from '../utils/jwtFormatter.ts';
import { deleteTeam, updateTeam } from '../api/teams.ts';
import Table from '../component/table/Table.tsx';
import { useParams } from 'react-router';
import AddMemberTeam from '../component/teams/AddMemberTeam.tsx';

const Teams = () => {
    const { data, setData } = useContext(Context)
    const [isOpen, setIsOpen] = useState(false)
    const [typeFn, setTypeFn] = useState<"add" | "edit" | "add-member">("add")
    const [team, setTeam] = useState<ITeam | undefined>()
    const [users, setUsers] = useState<ITeam>([])

    const params = useParams();

    const fetch = async () => {
        try {
            const resp = await getUsers()
            setUsers(resp)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    const handleMember = () => {
        setIsOpen(true)
        setTypeFn("add-member")
        setTeam(data.find(d => d.id == params.teamId))
    }

    const handleAdd = () => {
        setIsOpen(true)
        setTypeFn("add")
    }

    const handleEdit = (d: IData) => {
        setTeam(d)
        setIsOpen(true)
        setTypeFn("edit")
    }

    const deleteMember = async (d: IData) => {
        try{
            const team = data.find(d => d.id == params.teamId)
            const formData = {
                name: team.name,
                id: team.id,
                members: team.members.filter(t=>t != d.id)
            } as ITeam
    
            await updateTeam(formData)

            setData(
                data.map(da=>(
                    {
                        ...da,
                        members: da.id == params.teamId ? formData.members : da.members
                    }
                ))
            )
            
        } catch(error){
            console.log(error)
        }
    }

    const handleDelete = async (d: IData) => {
        try {
            await deleteTeam(d.id || 0)
            const teams = data.filter((team: IData) => team.id !== d.id);
            console.log(teams)
            setData([...teams])

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="teams-wrapper">
            <div className="teams-container">
                <h1 className="teams-title">members</h1>
                <div className="divider"></div>
                <div className="buttons-wrapper">
                    <button className={`teams-button join-button`} onClick={handleMember}>add member</button>
                </div>
                <Table
                    body={
                        data.find(d => d.id == params.teamId)?.members
                            .sort((a: number, b: number) => (a || 0) - (b || 0))
                            .map(member => ({
                                id: member,
                                name: users.find(user => user.id == member)?.username
                            }))
                    }
                    noDelete={[decodeJWT().user_id as number]}
                    handleDelete={deleteMember}
                />
            </div>
            <div className="teams-container">
                <h1 className="teams-title">Teams</h1>
                <div className="divider"></div>
                <div className="buttons-wrapper">
                    <button className={`teams-button join-button`} onClick={handleAdd}>add team</button>
                </div>
                <Table
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    body={data
                        .sort((a: IData, b: IData) => (a.id || 0) - (b.id || 0))
                        .map((data: IData) => {
                            return {
                                ...data,
                                members: data.members
                                    .map(memberId => {
                                        const user = users.find(user => user.id === memberId);
                                        return user ? user.username : "Unknown";
                                    })
                                    .join(", "),
                                projects: data.projects.map(project => project.name).join(", "),
                            };
                        })
                    }
                    noDelete={[(params as any).teamId as number]}
                />
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={typeFn == "add" ? "create team" : typeFn == "edit" ? "edit team" : "add member"}>
                    {
                        typeFn == "add" ?
                            <AddTeam setOpenModal={setIsOpen} /> :
                            typeFn == "edit" ?
                                <EditTeam setOpenModal={setIsOpen} {...team} /> :
                                <AddMemberTeam setOpenModal={setIsOpen} {...team} users={users} />
                    }
                </Modal>
            </div>
        </div>
    );
};

export default Teams;
