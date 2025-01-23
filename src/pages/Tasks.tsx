import React, { useState } from 'react';
import './Tasks.scss';

const Tasks = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        project: '',
        content: ''
    });
    const [message, setMessage] = useState('');
    const [teams, setTeams] = useState(['TeamA', 'TeamB']); // Example predefined teams

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!teams.includes(formData.project)) {
            setMessage('Team is not existing');
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
            return;
        }
        console.log('New Task:', formData);
        // Add logic to save the task
        setFormData({ title: '', project: '', content: '' });
        setShowForm(false);
        setMessage('Added successfully');
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    };

    return (
        <div className="tasks-container">
            <h1 className="tasks-title">Tasks</h1>
            <button 
                className={showForm ? "tasks-button cancel-button" : "tasks-button add-button"} 
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Cancel' : 'Add Task'}
            </button>
            {showForm && (
                <form className="tasks-form" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="text-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="project">Team:</label>
                        <input
                            type="text"
                            id="project"
                            name="project"
                            value={formData.project}
                            onChange={handleInputChange}
                            className="text-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Contents:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            className="text-input"
                        ></textarea>
                    </div>
                    <button className="form-submit-button" type="submit">Save Task</button>
                </form>
            )}
            {message && <p className="task-message">{message}</p>}
        </div>
    );
};

export default Tasks;
