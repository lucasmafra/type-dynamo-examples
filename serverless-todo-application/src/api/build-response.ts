export const buildResponse = (status: number, message?: string, data?: object) => {
    return {
        body: JSON.stringify({ message, data }),
        statusCode: status,
    }
}
