import { APIGatewayEvent, Handler } from 'aws-lambda'
import { TodoRepository } from '../db/todo'
import { v4 as generateId } from 'uuid'
import { buildResponse } from './build-response'

export const createTodo: Handler = async (event: APIGatewayEvent) => {
  const { name, status } = JSON.parse(event.body)
  const { data: todo } = await TodoRepository.save({ id: generateId(), name, status }).execute()
  return buildResponse(200, 'Todo created with success!', todo)
}

export const getTodos: Handler = async () => {
  const { data: todos } = await TodoRepository.find().allResults().execute()
  return buildResponse(200, undefined, todos )
}