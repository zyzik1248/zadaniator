export interface ITasks {
    tasks: ITask[]
}

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

export interface IRegister {
    username: string,
    password: string,
    email: string
}

export interface ILogin {
    password: string,
    username: string
}