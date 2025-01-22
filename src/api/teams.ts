import { ITeam } from "../types.ts";
import { privateApi } from "./privateApi.ts";

export const getTeams = async () => {  
    try {
      const resp = await privateApi(`/api/teams/`, {
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

  export const createTeam = async ({ name, members }: ITeam) => {  
    try {
      const resp = await privateApi(`/api/teams/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, members })
      });
  
      return resp
    } catch (error) {
        throw new Error(error)
    }
  };