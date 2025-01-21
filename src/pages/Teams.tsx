import React, { useState } from 'react';
import './Teams.scss';

const Teams = () => {
    const [activeForm, setActiveForm] = useState('');
    const [teamName, setTeamName] = useState('');
    const [teams, setTeams] = useState([]);
    const [joinTeamName, setJoinTeamName] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateTeam = (e) => {
        e.preventDefault();
        if (teamName.trim() !== '') {
            if (teams.includes(teamName)) {
                setMessage('Already exists');
                setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
            } else {
                setTeams([...teams, teamName]);
                setMessage('Added successfully');
                setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
            }
            setTeamName('');
            setActiveForm('');
        }
    };

    const handleJoinTeam = (e) => {
        e.preventDefault();
        if (teams.includes(joinTeamName)) {
            setMessage(`Welcome to: ${joinTeamName}`);
            setTimeout(() => setMessage(''), 4000); // Clear message after 3 seconds
        } else {
            setMessage('Not existing');
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        }
        setJoinTeamName('');
    };

    return (
        <div className="teams-container">
            <h1 className="teams-title">Teams</h1>
            <div className="button-group">
                <button 
                    className={`teams-button ${activeForm === 'create' ? 'cancel-button' : 'join-button'}`} 
                    onClick={() => setActiveForm(activeForm === 'create' ? '' : 'create')}
                >
                    {activeForm === 'create' ? 'Cancel' : 'Create Team'}
                </button>
                <button 
                    className={`teams-button ${activeForm === 'join' ? 'cancel-button' : 'join-button'}`} 
                    onClick={() => setActiveForm(activeForm === 'join' ? '' : 'join')}
                >
                    {activeForm === 'join' ? 'Cancel' : 'Join to Team'}
                </button>
            </div>
            {activeForm === 'create' && (
                <form className="teams-form" onSubmit={handleCreateTeam}>
                    <div className="form-group">
                        <label htmlFor="teamName">Team Name:</label>
                        <input
                            type="text"
                            id="teamName"
                            name="teamName"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="text-input"
                        />
                    </div>
                    <button className="form-submit-button" type="submit">Create Team</button>
                </form>
            )}

            {activeForm === 'join' && (
                <form className="teams-form" onSubmit={handleJoinTeam}>
                    <div className="form-group">
                        <label htmlFor="joinTeamName">Team Name to Join:</label>
                        <input
                            type="text"
                            id="joinTeamName"
                            name="joinTeamName"
                            value={joinTeamName}
                            onChange={(e) => setJoinTeamName(e.target.value)}
                            className="text-input"
                        />
                    </div>
                    <button className="form-submit-button" type="submit">Join Team</button>
                </form>
            )}

            {message && <p className="join-message">{message}</p>}
        </div>
    );
};

export default Teams;
