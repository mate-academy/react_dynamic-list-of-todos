import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

import { useDispatch } from 'react-redux';
import { setUser } from '../../store/selectUser';
import { TodoFilter } from '../TodoFilter';

export const TodoList = ({ todos }) => {
  const dispatch = useDispatch();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <TodoFilter />

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                todo.completed
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked',
              )}
            >
              <label>
                <input
                  checked={todo.completed}
                  type="checkbox"
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => dispatch(setUser(todo.userId))}
              >
                {'user '}
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })).isRequired,
};
