import React, { useState } from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoList = ({
  checkOnCompletedTodos,
  chooseUserId,
  randomize,
  todos,
}) => {
  const [filterTitle, setFilterTitle] = useState('');
  const selectOfTodos = [`active`, `completed`];
  const [selectTodos, setSelectTodos] = useState('');

  const getFilteresTodos = (data, selectedData, filter) => {
    console.log(filter);
    let array = data.filter(
      (todo) => {
        switch (selectedData) {
          case `active`:
            return !todo.completed;
          case `completed`:
            return todo.completed;
          default:
            return todo;
        }
      },
    ).filter(todo => todo.title !== null && todo.title.toLowerCase()
      .includes(filter.toLowerCase()));

    return array;
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="App__input">
        <label className="filterByTitle">
          <input
            className="filterByTitle"
            type="text"
            name="filterTitle"
            placeholder="put name of todo"
            value={filterTitle}
            onChange={event => setFilterTitle(event.target.value)}
          />
          <span className="bar" />
        </label>

      </div>
      <div className="App__select">

        <label htmlFor="complite">
          Filter todos by select methods
        </label>
        <select
          name="selectTodos"
          value={selectTodos}
          onChange={event => setSelectTodos(event.target.value)}
        >
          <option value="all">
            all
          </option>
          {selectOfTodos.map(todo => (
            <option
              key={todo}
              value={todo}
            >
              {todo}
            </option>
          ))}
        </select>
      </div>
      <div className="App__randomize">
        <button
          className="randomize"
          type="button"
          onClick={() => randomize()}
        >
          User&nbsp;#2
          Randomize
        </button>

      </div>
      <ul>

        {getFilteresTodos(todos, selectTodos, filterTitle).map(todo => (
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
                type="checkbox"
                checked={todo.completed}
                onChange={() => checkOnCompletedTodos(todo.id)}
                readOnly
              />
              <p>{todo.title}</p>
            </label>
            {todo.completed
              ? (
                <button
                  className="TodoList__user-button button"
                  type="button"
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              )
              : (
                <button
                  className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                  type="button"
                  onClick={() => chooseUserId(todo.userId)}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  chooseUserId: PropTypes.func.isRequired,
  randomize: PropTypes.func.isRequired,
  checkOnCompletedTodos: PropTypes.func.isRequired,

  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ),
};

TodoList.defaultProps = {
  todos: [],
};
