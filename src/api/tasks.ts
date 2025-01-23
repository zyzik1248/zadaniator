import { ITask, ITeam } from "../types.ts";
import { privateApi } from "./privateApi.ts";

  export const createTask= async ({ title, project, description, progress, story_points, created_by }: ITask) => {  
    try {
      const resp = await privateApi(`/api/tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, project, description, progress, story_points, created_by })
      });
  
      return resp
    } catch (error) {
        throw new Error(error)
    }
  };

  export const updateTask = async ({ title, project, description, progress, story_points, id }: ITask) => {  
    try {
      const resp = await privateApi(`/api/tasks/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, project, description, progress, story_points })
      });
  
      return resp
    } catch (error) {
        throw new Error(error)
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
  
      return resp
    } catch (error) {
        throw new Error(error)
    }
  };