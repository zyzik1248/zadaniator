import { ITask } from "../types.ts";
import { privateApi } from "./privateApi.ts";

export const createTask = async ({ 
    title, 
    project, 
    description, 
    progress, 
    story_points, 
    created_by, 
    priority 
}: ITask) => {  
    try {
        const resp = await privateApi(`/api/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                title, 
                project, 
                description, 
                progress, 
                story_points, 
                created_by, 
                priority 
            })
        });
        return resp;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateTask = async ({ 
    title, 
    project, 
    description, 
    progress, 
    story_points, 
    id, 
    priority, 
    approved_by_tester 
}: ITask) => {  
    try {
        const bodyData: any = { 
            title, 
            project, 
            description, 
            progress, 
            story_points, 
            priority 
        };
        
        if (typeof approved_by_tester !== 'undefined') {
            bodyData.approved_by_tester = approved_by_tester;
        }

        const resp = await privateApi(`/api/tasks/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData)
        });
        return resp;
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteTask = async (id: number) => {  
    try {
        const resp = await privateApi(`/api/tasks/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return resp;
    } catch (error) {
        throw new Error(error);
    }
};
