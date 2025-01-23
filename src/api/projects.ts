import { IProject } from "../types.ts";
import { privateApi } from "./privateApi.ts";

export const getProjects = async () => {
    try {
        const resp = await privateApi(`/api/projects/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return resp
    } catch (error) {
        throw new Error(error)
    }
};

export const createProject = async ({ name, created_at, description, updated_at, team, tasks }: IProject) => {
    try {
        const resp = await privateApi(`/api/projects/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                ...(created_at ? { created_at } : {}),
                description,
                ...(updated_at ? { updated_at } : {}),
                team,
                ...(tasks ? { tasks } : {})
            })
        });

        return resp
    } catch (error) {
        throw new Error(error)
    }
};

export const updateProject = async ({ name, created_at, description, updated_at, team, tasks, id }: IProject) => {
    try {
        const resp = await privateApi(`/api/projects/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                ...(created_at ? { created_at } : {}),
                description,
                ...(updated_at ? { updated_at } : {}),
                team,
                ...(tasks ? { tasks } : {})
            })
        });

        return resp
    } catch (error) {
        throw new Error(error)
    }
};

export const deleteProject = async (id: number) => {
    try {
        const resp = await privateApi(`/api/projects/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return resp
    } catch (error) {
        throw new Error(error)
    }
};
