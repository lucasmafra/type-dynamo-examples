import { Todo } from '../models/todo'
import { isEqualTo, match } from 'type-dynamo/dist/expressions'
import { TodoRepository } from './todo'
import { Omit } from 'type-dynamo/dist/helpers'
import { v4 as generateId } from 'uuid'

export const saveTodo = async ({ title, completed }: Omit<Todo, 'id'>) => {
    const { data: todo } = await TodoRepository.save({
        id: generateId(), title, completed
    }).execute()
    return todo
}

export const getAllTodos = async () => {
    const { data: todos } = await TodoRepository.find().allResults().execute()
    return todos
}

export const update = async (id: string, input: Partial<Todo>) => {
    const { data: todo } = await TodoRepository.update({ id, ...input }).execute()
    return todo
}

export const destroyTodo = async(id: string) => {
    const { data: todo } = await TodoRepository.delete({ id }).execute()
    return todo
}

export const getTodosWhere = async ({ completed }: Partial<Todo>) => {
    const { data: todos } = await TodoRepository.find()
        .filter(match('completed', isEqualTo(completed)))
        .allResults()
        .execute()
    return todos
}

export const updateTodos = (todos: Array<Todo>, updateInput: Partial<Todo>) => {
    return Promise.all(todos.map((todo) => update(todo.id, { ...todo, ...updateInput})))
}

export const deleteTodos = (todos: Array<Todo>) => {
    const toId = (todo) => ({ id: todo.id })
    return TodoRepository.delete(todos.map(toId)).execute()
}