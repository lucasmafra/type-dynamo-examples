import React, {Component} from 'react';
import './App.css';
import {TodoListItem} from "./TodoListItem";
import {Footer} from "./Footer";
import {TodoItem} from "./TodoItem";

class App extends Component {
    ALL_TODOS = 'all';
    ACTIVE_TODOS = 'active';
    COMPLETED_TODOS = 'completed';
    ENTER_KEY = 13;

    state = {
        nowShowing: this.ALL_TODOS,
        editing: null,
        newTodo: '',
        todos: []
    }

    handleChange = (event) => {
        this.setState({newTodo: event.target.value});
    }

    repositoryAddTodo = (val) => {
        const { todos } = this.state
        const id = todos.length + 1
        const todo = { id, title: val, completed: false }
        todos.push(todo)
        this.setState({ todos: todos })
    }

    repositoryToggleAll = (checked) => {
        const { todos } = this.state
        const toggleTodos = todos.map((todo) => ({ ...todo, completed: checked }))
        this.setState({ todos: toggleTodos })
    }

    repositoryClearCompleted = () => {
        const { todos } = this.state
        const notCompleted = (todo) => !todo.completed
        const activeTodos = todos.filter(notCompleted)
        this.setState({ todos: activeTodos })
    }

    repositoryToggle = (todoToToggle) => {
        const { todos } = this.state
        const todo = todos.find((todo) => todo.id === todoToToggle.id)
        todo.completed = !todoToToggle.completed
        this.setState({ todos: todos })
    }

    repositorySave = (todoToSave, text) => {
        const { todos } = this.state
        const todo = todos.find((todo) => todo.id === todoToSave.id)
        todo.title = text
        this.setState({ todos: todos })
    }

    repositoryDestroy = (todo) => {
        const todos = this.state.todos.filter((t) => todo.id !== t.id)
        this.setState({ todos: todos })
    }

    repositoryGetTodos = () => {
        return this.state.todos
    }

    handleNewTodoKeyDown = (event) => {
        if (event.keyCode !== this.ENTER_KEY) {
            return;
        }

        event.preventDefault();

        var val = this.state.newTodo.trim();

        if (val) {
            this.repositoryAddTodo(val);
            this.setState({newTodo: ''});
        }
    }

    toggleAll = (event) => {
        const checked = event.target.checked;
        this.repositoryToggleAll(checked);
    }

    toggle = (todoToToggle) => {
        this.repositoryToggle(todoToToggle);
    }

    destroy = (todo) => {
        this.repositoryDestroy(todo);
    }

    edit = (todo) => {
        this.setState({editing: todo.id});
    }

    save = (todoToSave, text) => {
        this.repositorySave(todoToSave, text);
        this.setState({editing: null});
    }

    cancel = () => {
        this.setState({editing: null});
    }

    clearCompleted = () => {
        this.repositoryClearCompleted();
    }

    updateShowing = (showing) => () => {
        this.setState({
            nowShowing: showing
        })
    }

    render = () => {
        const todos = this.repositoryGetTodos();
        const shownTodos = todos.filter((todo) => {
            switch (this.state.nowShowing) {
                case this.ACTIVE_TODOS:
                    return !todo.completed;
                case this.COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        }, this);

        const activeTodoCount = todos.reduce((accum, todo) => {
            return todo.completed ? accum : accum + 1;
        }, 0)

        const completedCount = todos.length - activeTodoCount;

        const todoItems = shownTodos.map((todo) => (
            <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={this.toggle.bind(this, todo)}
                onDestroy={this.destroy.bind(this, todo)}
                onEdit={this.edit.bind(this, todo)}
                editing={this.state.editing === todo.id}
                onSave={this.save.bind(this, todo)}
                onCancel={this.cancel}
            />
        ))
        const footer = (activeTodoCount || completedCount) ?
            <Footer
                count={todos.length}
                onClearCompleted={this.clearCompleted}
                completedCount={completedCount}
                nowShowing={this.state.nowShowing}
                updateShowing={this.updateShowing}
            />
            : null
        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        value={this.state.newTodo}
                        onKeyDown={this.handleNewTodoKeyDown}
                        onChange={this.handleChange}
                        autoFocus={true}
                    />
                </header>
                <TodoListItem
                    toggleAll={this.toggleAll}
                    activeTodoCount={activeTodoCount}
                    todoItems={todoItems}
                />
                { footer }
            </div>
        );
    }
}

export default App;
