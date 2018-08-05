import classNames from 'classnames'
import React from 'react'
import pluralize from 'pluralize'

/* Props:
 * count: Number
 * onClearCompleted: Function
 * completedCount: Number
 * nowShowing: Boolean
 */
export class Footer extends React.Component {
    render = () => {
        const activeTodoWord = pluralize('item', this.props ? this.props.count : 0);
        const clearButton = (
            <button
                className="clear-completed"
                onClick={this.props && this.props.onClearCompleted}
            >
                Clear completed
            </button>
        )
        const { nowShowing, updateShowing } = this.props
        return (
            <footer className="footer">
					<span className="todo-count">
						<strong>{this.props && this.props.count ? this.props.count : 0 }</strong> {activeTodoWord} left
					</span>
                <ul className="filters">
                    <li>
                        <a
                            onClick={updateShowing('all')}
                            className={classNames({selected: nowShowing === 'all'})}>
                            All
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            onClick={updateShowing('active')}
                            className={classNames({selected: nowShowing === 'active'})}>
                            Active
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            onClick={updateShowing('completed')}
                            className={classNames({selected: nowShowing === 'completed'})}>
                            Completed
                        </a>
                    </li>
                </ul>
                {this.props && this.props.completedCount > 0 && clearButton}
            </footer>
        )
    }
}