import { db } from './db'
import { Todo } from '../models/todo'

export const TodoRepository = db.define(Todo, {
    tableName: 'TodoTable',
    partitionKey: 'id'
})