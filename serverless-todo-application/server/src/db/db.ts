import { TypeDynamo } from 'type-dynamo'

export const db = new TypeDynamo({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
})