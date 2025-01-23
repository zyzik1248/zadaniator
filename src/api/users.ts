import { privateApi } from "./privateApi.ts";

export const getUsers = async () => {  
    try {
      const resp = await privateApi(`/api/users/`, {
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