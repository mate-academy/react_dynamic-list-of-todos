import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Button } from '../Button/Button';
import { TodoShape } from '../../shapes/TodoShape';
import './TodoList.scss';

export const TodoList = ({ todos, getUserId, selectedUserId }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={
              classNames(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
            key={todo.id}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <Button
              className={
                classNames(
                  'TodoList__user-button',
                  'button',
                  {
                    'TodoList__user-button--selected':
                      todo.userId === selectedUserId,
                  },
                )
              }
              type="button"
              onClick={() => getUserId(todo.userId)}
              content={`User #${todo.userId}`}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  getUserId: PropTypes.func.isRequired,
};
