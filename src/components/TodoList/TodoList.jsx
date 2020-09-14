/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export const TodoList = ({
  todos,
  checkboxChange,
  selectedTodoId,
  handleClick,
  todoFilter,
  todoFilterComplete,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <input
      type="text"
      onChange={event => todoFilter(event.target.value)}
      placeholder="Search todo"
    />
    <select
      onChange={event => todoFilterComplete(event.target.value)}
    >
      <option
        value="all"
      >
        All
      </option>
      <option
        value="completed"
      >
        Completed
      </option>
      <option
        value="active"
      >
        Active
      </option>
    </select>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={todo.completed
              ? 'TodoList__item TodoList__item--checked'
              : 'TodoList__item TodoList__item--unchecked'}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onClick={() => checkboxChange(todo.id)}
                readOnly
              />
              <p>{todo.title}</p>
            </label>
            <button
              className={classNames('TodoList__user-button',
                'button',
                { 'TodoList__user-button--selected':
                selectedTodoId === todo.id })
              }
              type="button"
              onClick={() => handleClick(todo.userId, todo.id)}
            >
              User&nbsp;#
              {todo.userId}
            </button>
          </li>
          /* <li className="TodoList__item TodoList__item--unchecked">
              <label>
                <input type="checkbox" readOnly />
                <p>delectus aut autem</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
              >
                User&nbsp;#1
              </button>
            </li>

            <li className="TodoList__item TodoList__item--checked">
              <label>
                <input type="checkbox" checked readOnly />
                <p>distinctio vitae autem nihil ut molestias quo</p>
              </label>

              <button
                className="TodoList__user-button button"
                type="button"
              >
                User&nbsp;#2
              </button>
            </li> */
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  checkboxChange: PropTypes.func.isRequired,
};
