import { Todo } from '../models/todo'
import { db } from './db'

export const TodoRepository = db.define(Todo, {
    tableName: 'TodoTable',
    partitionKey: 'id',
}).getInstance()
