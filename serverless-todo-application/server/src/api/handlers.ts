import { APIGatewayEvent, Handler } from 'aws-lambda'
import { buildResponse } from './build-response'
import { getTodosWhere, saveTodo, updateTodos, getAllTodos, update, destroyTodo, deleteTodos } from '../db/queries'

export const createTodo: Handler = async (event: APIGatewayEvent) => {
    try {
        const { title } = JSON.parse(event.body)
        const todo = await saveTodo({ title, completed: false })
        return buildResponse(200, 'Todo created with success!', todo)
    } catch (err) {
        return buildResponse(500, 'Internal Server Error', { error: err.message })
    }
}

export const getTodos: Handler = async () => {
    try {
        const todos = await getAllTodos()
        return buildResponse(200, undefined, todos)
    } catch (err) {
        return buildResponse(500, 'Internal Server Error', { error: err.message })
    }
}

export const updateTodo: Handler = async (event: APIGatewayEvent) => {
    try {
        const id = event.pathParameters['id']
        const { title, completed } = JSON.parse(event.body)
        const todo = await update(id, { title, completed })
        return buildResponse(200, 'Todo updated with success!', todo)
    } catch (err) {
        return buildResponse(500, 'Internal Server Error', { error: err.message })
    }
}

export const deleteTodo: Handler = async (event: APIGatewayEvent) => {
    try {
        const id = event.pathParameters['id']
        const todo = await destroyTodo(id)
        return buildResponse(200, 'Todo deleted with success!', todo)
    } catch (err) {
        return buildResponse(500, 'Internal Server Error', { error: err.message })
    }
}

export const toggleAllTodos: Handler = async (event: APIGatewayEvent) => {
    try {
        const { completed } = JSON.parse(event.body)
        const todosToUpdate = await getTodosWhere({ completed: !completed })
        await updateTodos(todosToUpdate, { completed })
        return buildResponse(200, 'Todos updated with success!')
    } catch (err) {
        return buildResponse(500, 'Internal Server Error', { error: err.message })
    }
}

export const deleteCompletedTodos: Handler = async (event: APIGatewayEvent) => {
    try {
        const todosToDelete = await getTodosWhere({ completed: true })
        await deleteTodos(todosToDelete)
        return buildResponse(200, 'Todos deleted with success!')
    } catch (err) {
        return buildResponse(500, 'Internal Server Error', { error: err.message })
    }
}