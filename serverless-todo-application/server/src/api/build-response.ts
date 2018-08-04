export const buildResponse = (status: number, message?: string, data?: Object) => {
    return {
        statusCode: status,
        body: JSON.stringify({ message, data }),
    }
}