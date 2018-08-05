import { APIGatewayEvent, Handler } from 'aws-lambda'
import { deleteTodos, destroyTodo, getAllTodos, getTodosWhere, saveTodo, update, updateTodos } from '../db/queries'
import { buildResponse } from './build-response'

export const createTodo: Handler = async (event: APIGatewayEvent) => {
    const {title} = JSON.parse(event.body)
    const todo = await saveTodo({title, completed: false})
    return buildResponse(200, 'Todo created with success!', todo)
}

export const getTodos: Handler = async () => {
    const todos = await getAllTodos()
    return buildResponse(200, undefined, todos)
}

export const updateTodo: Handler = async (event: APIGatewayEvent) => {
    const id = event.pathParameters.id
    const {title, completed} = JSON.parse(event.body)
    const todo = await update(id, {title, completed})
    return buildResponse(200, 'Todo updated with success!', todo)
}

export const deleteTodo: Handler = async (event: APIGatewayEvent) => {
    const id = event.pathParameters.id
    const todo = await destroyTodo(id)
    return buildResponse(200, 'Todo deleted with success!', todo)
}

export const toggleAllTodos: Handler = async (event: APIGatewayEvent) => {
    const {completed} = JSON.parse(event.body)
    const todosToUpdate = await getTodosWhere({completed: !completed})
    await updateTodos(todosToUpdate, {completed})
    return buildResponse(200, 'Todos updated with success!')
}

export const deleteCompletedTodos: Handler = async (event: APIGatewayEvent) => {
    const todosToDelete = await getTodosWhere({completed: true})
    await deleteTodos(todosToDelete)
    return buildResponse(200, 'Todos deleted with success!')
}
