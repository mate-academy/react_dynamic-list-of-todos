import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './TodoList.scss';

export class TodoList extends React.PureComponent {
  render() {
    const { todos, onSelectedUser } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  }
                )}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  type="button"
                  className={classNames('TodoList__user-button', 'button',
                    {'TodoList__user-button--selected': this.props.selectedUserId === todo.userId}
                  )}
                  onClick={() => onSelectedUser(todo.userId)}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  onSelectedUser: PropTypes.func.isRequired,
};
