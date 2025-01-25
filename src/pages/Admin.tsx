import React, { useState, useEffect } from 'react';
import { isUserAdmin } from '../utils/jwtFormatter.ts';
import { getUsers, deleteUser } from '../api/users.ts';
import { createTeam, updateTeam, getTeams } from '../api/teams.ts';
import { createProject, getProjects } from '../api/projects.ts';
import { IUser, ITeam, IProject } from '../types.ts';
import Loader from '../components/Loader.tsx';
import './Admin.scss';

const AdminPage = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<IUser[]>([]);
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null);

    useEffect(() => {
        if (!isUserAdmin()) {
            window.location.href = '/';
            return;
        }

        const fetchData = async () => {
            try {
                const [usersData, teamsData, projectsData] = await Promise.all([
                    getUsers(),
                    getTeams(),
                    getProjects()
                ]);
                setUsers(usersData);
                setTeams(teamsData);
                setProjects(projectsData);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteUser = async (userId: number) => {
        if (deleteConfirmation !== userId) {
            setDeleteConfirmation(userId);
            return;
        }
        
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
            setDeleteConfirmation(null);
        } catch (error) {
            console.error('Błąd podczas usuwania użytkownika:', error);
        }
    };

    const validateTeamName = (name: string): boolean => {
        return name.length >= 3 && !/[^a-zA-Z0-9\s-]/.test(name);
    };

    const validateProjectName = (name: string): boolean => {
        return name.length >= 3 && !/[^a-zA-Z0-9\s-]/.test(name);
    };

    const handleAddToTeam = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const teamName = formData.get('teamName') as string;
        const userId = selectedUser;

        if (!validateTeamName(teamName)) {
            console.error('Nieprawidłowa nazwa zespołu (min. 3 znaki, tylko litery, cyfry, spacje i myślniki)');
            return;
        }

        try {
            const existingTeam = teams.find(t => t.name.toLowerCase() === teamName.toLowerCase());

            if (!existingTeam) {
                const newTeam = await createTeam({
                    name: teamName,
                    members: [userId]
                });
                setTeams([...teams, newTeam]);
            } else if (!existingTeam.members.includes(userId)) {
                const updatedTeam = await updateTeam({
                    ...existingTeam,
                    members: [...existingTeam.members, userId]
                });
                setTeams(teams.map(t => t.id === updatedTeam.id ? updatedTeam : t));
            }
        } catch (error) {
            console.error('Błąd podczas dodawania do zespołu:', error);
        }
    };

    const handleAddToProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const projectName = formData.get('projectName') as string;
        const teamName = formData.get('teamName') as string;
        const userId = selectedUser;

        if (!validateProjectName(projectName)) {
            console.error('Nieprawidłowa nazwa projektu (min. 3 znaki, tylko litery, cyfry, spacje i myślniki)');
            return;
        }

        if (!validateTeamName(teamName)) {
            console.error('Nieprawidłowa nazwa zespołu (min. 3 znaki, tylko litery, cyfry, spacje i myślniki)');
            return;
        }

        try {
            const existingProject = projects.find(p => p.name.toLowerCase() === projectName.toLowerCase());

            if (!existingProject) {
                let team = teams.find(t => t.name.toLowerCase() === teamName.toLowerCase());

                if (!team) {
                    team = await createTeam({
                        name: teamName,
                        members: [userId]
                    });
                    setTeams([...teams, team]);
                } else if (!team.members.includes(userId)) {
                    team = await updateTeam({
                        ...team,
                        members: [...team.members, userId]
                    });
                    setTeams(teams.map(t => t.id === team.id ? team : t));
                }

                const newProject = await createProject({
                    name: projectName,
                    description: `Project created by admin for ${teamName}`,
                    team: team.id
                });
                setProjects([...projects, newProject]);
            }
        } catch (error) {
            console.error('Błąd podczas dodawania do projektu:', error);
        }
    };

    const handleBackToMain = () => {
        window.location.href = '/';
    };

    const handleBackToUserList = () => {
        setSelectedUser(null);
    };

    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <Loader text="Wczytywanie panelu administratora..." />;
    }

    return (
        <div className="admin-page">
            <div className="header">
                <div className="title-section">
                    <h1>Panel Administratora</h1>
                    <button onClick={handleBackToMain} className="back-button">
                        Powrót do strony głównej
                    </button>
                </div>
            </div>
            
            {!selectedUser ? (
                <section className="users-list">
                    <h2>Lista Użytkowników</h2>
                    <input
                        type="text"
                        placeholder="Szukaj użytkownika..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => setSelectedUser(user.id)}>Wybierz</button>
                                        <button 
                                            onClick={() => handleDeleteUser(user.id)}
                                            className={deleteConfirmation === user.id ? 'confirm-delete' : ''}
                                        >
                                            {deleteConfirmation === user.id ? 'Potwierdź usunięcie' : 'Usuń'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            ) : (
                <section className="user-actions">
                    <div className="section-header">
                        <h2>Akcje dla wybranego użytkownika</h2>
                        <button onClick={handleBackToUserList} className="back-button">
                            Powrót do listy użytkowników
                        </button>
                    </div>
                    
                    <div className="existing-teams">
                        <h3>Istniejące zespoły</h3>
                        <ul>
                            {teams.map(team => (
                                <li key={team.id}>
                                    <span>{team.name}</span>
                                    {!team.members.includes(selectedUser) && (
                                        <button 
                                            onClick={async () => {
                                                try {
                                                    const updatedTeam = await updateTeam({
                                                        ...team,
                                                        members: [...team.members, selectedUser]
                                                    });
                                                    setTeams(teams.map(t => t.id === updatedTeam.id ? updatedTeam : t));
                                                } catch (error) {
                                                    console.error('Błąd podczas dodawania do zespołu:', error);
                                                }
                                            }}
                                            className="add-button"
                                        >
                                            Dodaj do zespołu
                                        </button>
                                    )}
                                    {team.members.includes(selectedUser) && (
                                        <span className="member-badge">Członek zespołu</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <form onSubmit={handleAddToTeam}>
                        <h3>Stwórz nowy zespół</h3>
                        <input
                            type="text"
                            name="teamName"
                            placeholder="Nazwa nowego zespołu (min. 3 znaki, tylko litery, cyfry, spacje i myślniki)"
                            required
                            pattern="[a-zA-Z0-9\s-]{3,}"
                            title="Minimum 3 znaki, tylko litery, cyfry, spacje i myślniki"
                        />
                        <button type="submit">Stwórz zespół i dodaj użytkownika</button>
                    </form>

                    <div className="existing-projects">
                        <h3>Istniejące projekty</h3>
                        <ul>
                            {projects.map(project => {
                                const projectTeam = teams.find(t => t.id === project.team);
                                const isUserInTeam = projectTeam?.members.includes(selectedUser);
                                
                                return (
                                    <li key={project.id}>
                                        <div>
                                            <span>{project.name}</span>
                                            <span className="team-name">Zespół: {projectTeam?.name}</span>
                                        </div>
                                        {!isUserInTeam && (
                                            <button 
                                                onClick={async () => {
                                                    try {
                                                        if (projectTeam) {
                                                            const updatedTeam = await updateTeam({
                                                                ...projectTeam,
                                                                members: [...projectTeam.members, selectedUser]
                                                            });
                                                            setTeams(teams.map(t => t.id === updatedTeam.id ? updatedTeam : t));
                                                        }
                                                    } catch (error) {
                                                        console.error('Błąd podczas dodawania do projektu:', error);
                                                    }
                                                }}
                                                className="add-button"
                                            >
                                                Dołącz do projektu
                                            </button>
                                        )}
                                        {isUserInTeam && (
                                            <span className="member-badge">Członek projektu</span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <form onSubmit={handleAddToProject}>
                        <h3>Stwórz nowy projekt</h3>
                        <input
                            type="text"
                            name="projectName"
                            placeholder="Nazwa nowego projektu"
                            required
                            pattern="[a-zA-Z0-9\s-]{3,}"
                            title="Minimum 3 znaki, tylko litery, cyfry, spacje i myślniki"
                        />
                        <input
                            type="text"
                            name="teamName"
                            placeholder="Nazwa zespołu dla projektu (istniejący lub nowy)"
                            required
                            pattern="[a-zA-Z0-9\s-]{3,}"
                            title="Minimum 3 znaki, tylko litery, cyfry, spacje i myślniki"
                        />
                        <button type="submit">Stwórz projekt</button>
                    </form>
                </section>
            )}
        </div>
    );
};

export default AdminPage; 