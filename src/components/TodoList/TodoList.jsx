import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import { TodoType } from '../../types';
import './TodoList.scss';

export const TodoList = ({ todos, selectedUserId, onUserSelect }) => (
  <div className="TodoList">
    <h2>
      Total Todos:
      {todos.length}
    </h2>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classnames(
              'TodoList__item',
              {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              },
            )}
          >
            <Todo
              todo={todo}
              selectedUserId={selectedUserId}
              onUserSelect={onUserSelect}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType.isRequired).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  onUserSelect: PropTypes.func.isRequired,
};
