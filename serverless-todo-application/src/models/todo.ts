export class Todo {
    id: string
    title: string
    completed: boolean
    createdAt: number // timestamp in ms -> we'll use it to return todos chronologically
}
