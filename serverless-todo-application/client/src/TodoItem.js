import React from 'react'
import classNames from 'classnames'

export class TodoItem extends React.Component {
    ESCAPE_KEY = 27;
    ENTER_KEY = 13;

    state = {
        editText: this.props && this.props.todo && this.props.todo.title
    }

    handleSubmit = (event) => {
        const val = this.state.editText.trim();
        if (val) {
            this.props && this.props.onSave(val);
            this.setState({editText: val});
        } else {
            this.props && this.props.onDestroy();
        }
    }

    handleChange = (event) => {
        if (this.props && this.props.editing) {
            this.setState({ editText: event.target.value });
        }
    }

    handleKeyDown = (event) => {
        if (event.which === this.ESCAPE_KEY) {
            this.setState({editText: this.props && this.props.todo && this.props.todo.title});
            this.props && this.props.onCancel(event);
        } else if (event.which === this.ENTER_KEY) {
            this.handleSubmit(event);
        }
    }

    handleEdit = () => {
        this.props && this.props.onEdit();
        this.setState({editText: this.props && this.props.todo && this.props.todo.title});
    }

    render = () => {
        const { todo: { completed, title }, editing, onToggle, onDestroy } = this.props
        return (
            <li className={classNames({
                completed,
                editing
            })}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={completed}
                        onChange={onToggle}
                    />
                    <label onDoubleClick={this.handleEdit}>
                        {title}
                    </label>
                    <button className="destroy" onClick={onDestroy}/>
                </div>
                <input
                    ref="editField"
                    className="edit"
                    value={this.state.editText  }
                    onBlur={this.handleSubmit}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </li>
        )
    }
}