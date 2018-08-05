const API_URL = process.env.REACT_APP_API_URL

export const repository = {
    async addTodo(val) {
        await fetch(API_URL, {
            method: 'post',
            body: JSON.stringify({
                title: val
            }),
        })
    },

    async toggleAllTodosTo(value) {
        await fetch(`${API_URL}/toggleAll`, {
            method: 'put',
            body: JSON.stringify({
                completed: value
            })
        })
    },

    async deleteCompletedTodos() {
        await fetch(`${API_URL}/completed`, {
            method: 'delete',
        })
    },

    async updateTodo(todoToUpdate) {
        await fetch(`${API_URL}/${todoToUpdate.id}`, {
            method: 'put',
            body: JSON.stringify({
                title: todoToUpdate.title,
                completed: todoToUpdate.completed
            })
        })
    },

    async deleteTodo(todoToDelete) {
        await fetch(`${API_URL}/${todoToDelete.id}`, {
            method: 'delete',
        })
    },

    async getTodos() {
        const response = await fetch(API_URL)
        const { data: todos } = await response.json()
        return todos
    }
}