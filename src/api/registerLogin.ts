import { ILogin, IRegister } from "../types.ts";

import { privateApi } from "./privateApi.ts";


export const register = async ({ username, password, email }: IRegister) => {
    try {
        const resp = await fetch(`/api/register/`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ username, password, email })
        })

        return resp
    } catch (error) {
        throw new Error(error)
    }
}

export const login = async ({ password, username }: ILogin) => {
    try {
        const resp = await fetch(`/api/api/token/`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ username, password })
        })

        const json = await resp.json()
        return json
    } catch (error) {
        throw new Error(error)
    }
}

export const checkAuth = async () => {  
    try {
      await privateApi(`/api/tasks/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
    } catch (error) {
        throw new Error(error)
    }
  };
  