import React, { useContext } from "react";
import TasksCategory from "./TasksCategory.tsx";
import { useParams } from "react-router";
import { IData } from "../../types.ts";
import { Context } from "../context/ContextApi.ts";
import "./Tasks.scss";

interface IProps {
    handleEdit: (d: IData) => void;
    handleDelete: (d: IData) => void;
    column?: boolean;
}

const TasksBoxes: React.FC<IProps> = ({ handleEdit, handleDelete, column }) => {
    const params = useParams();
    const { data } = useContext(Context);

    const getTasks = (progress: number) => {
        return (
            data
                ?.find((team) => team.id === Number(params.teamId))
                ?.projects.find((project) => project.id === Number(params.projectId))
                ?.tasks?.sort((a: IData, b: IData) => (a.id || 0) - (b.id || 0))
                .filter((task) => task.progress === progress) || []
        );
    };

    console.log(getTasks(3))

    return (
        <div className="tasks-container">
            <div className={`tasks-row tasks ${column ? "column" : ""}`}>
                <TasksCategory
                    name="To Do"
                    tasks={getTasks(0)}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
                <TasksCategory
                    name="In Progress"
                    tasks={getTasks(1)}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
                <TasksCategory
                    name="Done"
                    tasks={getTasks(2)}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
                <TasksCategory
                    name="Review"
                    tasks={getTasks(3)}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default TasksBoxes;
