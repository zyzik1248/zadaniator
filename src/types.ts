interface Tasks {
    tasks: Task[]
}

interface Task {
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

interface register {
    username: string,
    password: string,
    email: string
}