import { TypeDynamo } from 'type-dynamo'

export const db = new TypeDynamo({
    region: process.env.REGION,
    endpoint: process.env.DYNAMO_ENDPOINT
})