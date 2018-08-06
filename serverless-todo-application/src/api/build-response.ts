export const buildResponse = (status: number, message?: string, data?: object) => {
    return {
        statusCode: status,
        body: JSON.stringify({ message, data }),
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Credentials' : true,
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PATCH, PUT, DELETE',
        },
    }
}
