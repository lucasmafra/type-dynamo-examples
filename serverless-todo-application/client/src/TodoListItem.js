import React from 'react'

export const TodoListItem = ({ toggleAll, activeTodoCount, todoItems }) => (
    <section className="main">
        <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={toggleAll}
            checked={activeTodoCount === 0}
        />
        <label
            htmlFor="toggle-all"
        />
        <ul className="todo-list">
            {todoItems}
        </ul>
    </section>
);