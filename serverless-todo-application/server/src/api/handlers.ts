import { APIGatewayEvent, Handler } from 'aws-lambda'
import { TodoRepository } from '../db/todo'
import { v4 as generateId } from 'uuid'
import { buildResponse } from './build-response'
import { TodoStatus } from '../models/todo'

export const createTodo: Handler = async (event: APIGatewayEvent) => {
  const { name } = JSON.parse(event.body)
  const { data: todo } = await TodoRepository.save({ id: generateId(), name, status: TodoStatus.ACTIVE }).execute()
  return buildResponse(200, 'Todo created with success!', todo)
}

export const getTodos: Handler = async () => {
  const { data: todos } = await TodoRepository.find().allResults().execute()
  return buildResponse(200, undefined, todos)
}

export const updateTodo: Handler = async (event: APIGatewayEvent) => {
  const id = event.pathParameters['id']
  const { status } = JSON.parse(event.body)
  const { data: todo } = await TodoRepository.update({ id, status }).execute()
  return buildResponse(200, 'Todo updated with success!', todo)
}

export const deleteTodo: Handler = async (event: APIGatewayEvent) => {
    const id = event.pathParameters['id']
    const { data: todo } = await TodoRepository.delete({ id }).execute()
    return buildResponse(200, 'Todo deleted with success!', todo)
}