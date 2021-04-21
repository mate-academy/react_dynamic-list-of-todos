import classNames from 'classnames';
import React from 'react';
import { TodoType } from '../Types';
import PropTypes from 'prop-types';

export class List extends React.Component {
  render() {
    const { selectedUserId, filtredTodos, getUserId } = this.props;

    return (
      <ul className="TodoList__list">
        {filtredTodos.map(todo => (
          <li
            key={todo.id}
            className={todo.completed
              ? 'TodoList__item TodoList__item--checked'
              : 'TodoList__item TodoList__item--unchecked'
            }
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames(
                'TodoList__user-button',
                'button',
                { 'TodoList__user-button--selected': (
                  selectedUserId !== todo.userId
                ) },
              )}
              type="button"
              onClick={() => getUserId(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}

List.propTypes = {
  getUserId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired, 
  filtredTodos: PropTypes.arrayOf(
    PropTypes.shape(TodoType)
  ).isRequired
}