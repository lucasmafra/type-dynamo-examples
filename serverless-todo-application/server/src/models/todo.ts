export class Todo {
    id: string
    name: string
    status: TodoStatus
}

export enum TodoStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
}