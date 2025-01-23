export interface ITask {
    id: number,
    title: string,
    description: string,
    progress: number,
    story_points: number,
    completed: boolean,
    created_at: string,
    updated_at: number,
    created_by: number,
    assigned_to: number,
    tester: number,
    project: number
}

export interface IProject{
    id?: number,
    tasks?: ITask[],
    name: string
    description: string,
    created_at?: string,
    updated_at?: string,
    team: number,
}

export interface IRegister {
    username: string,
    password: string,
    email: string
}

export interface ILogin {
    password: string,
    username: string
}

export interface ITeam {
    name: string,
    members: number[]
    id?: number
}

export interface IData {
    name: string,
    members: number[]
    id?: number
    projects: IProject[]
}

export interface IUser {
    id?: number,
    username: string,
    email: string
}