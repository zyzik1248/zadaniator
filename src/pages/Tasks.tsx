import React, { useState } from 'react';
import './Tasks.scss';

const Tasks = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        project: '',
        content: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('New Task:', formData);
        // Add logic to save the task
        setFormData({ title: '', project: '', content: '' });
        setShowForm(false);
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
                        <label htmlFor="title">Tytuł:</label>
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
                        <label htmlFor="project">Projekt:</label>
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
                        <label htmlFor="content">Treść:</label>
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
        </div>
    );
};

export default Tasks;