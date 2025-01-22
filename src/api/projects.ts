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

    export const createProjects = async ({ name, created_at, description, updated_at, team, tasks }: IProject) => {  
      try {
        const resp = await privateApi(`/api/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, created_at, description, updated_at, team, tasks: [] })
        });
    
        return resp
      } catch (error) {
          throw new Error(error)
      }
    };