import React, { useState } from 'react';
import Card from '../cards/Card.tsx';
import "./Tasks.scss";

interface Task {
    id: number;
    title: string;
    content: string;
    completed: boolean;
}

interface IProps {
    type?: "column" | "row";
    tasks: Task[]; // Lista zadań przekazywana jako props
}

const Tasks: React.FC<IProps> = ({ type = "column", tasks }) => {
    const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);

    const toggleTaskDetails = (taskId: number) => {
        setExpandedTaskId(prev => (prev === taskId ? null : taskId));
    };

    const markAsCompleted = (taskId: number) => {
        // Możesz dodać logikę do aktualizacji stanu w bazie danych lub globalnym stanie
        console.log(`Zadanie ${taskId} oznaczone jako ukończone`);
    };

    const sampleTasks: Task[] = [
        { id: 1, title: "Task One", content: "Content for Task One", completed: false },
        { id: 2, title: "Task Two", content: "Content for Task Two", completed: false },
        { id: 3, title: "Task Three", content: "Content for Task Three", completed: true },
    ];

    return (
        <Card className={`tasks ${type === "row" ? "tasks-row" : "tasks-column"}`} title="Tasks">
            <div className="tasks-container">
                {sampleTasks.map(task => (
                    <div key={task.id} className="task-item">
                        <div className="task-header" onClick={() => toggleTaskDetails(task.id)}>
                            <span className={`task-title ${task.completed ? "completed" : ""}`}>
                                {task.title}
                            </span>
                        </div>
                        {expandedTaskId === task.id && (
                            <div className="task-details">
                                <p>{task.content}</p>
                                <button onClick={() => markAsCompleted(task.id)}>
                                    {task.completed ? "Completed" : "Completed"}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default Tasks;