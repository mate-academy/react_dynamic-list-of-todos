import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const TodoList = ({
  allTodos,
  filteredTodos,
  updateUserId,
  updateTodos,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="TodoList__control">
      <select
        className="TodoList__control__selected"
        onChange={(event) => {
          if (event.target.value === 'All') {
            updateTodos(allTodos);
          }

          if (event.target.value === 'active') {
            updateTodos(allTodos.filter(todo => !todo.completed));
          }

          if (event.target.value === 'completed') {
            updateTodos(allTodos.filter(todo => todo.completed));
          }
        }}
      >
        <option>All</option>
        <option>active</option>
        <option>completed</option>
      </select>
      <input
        type="text"
        className="TodoList__control__search"
        placeholder="search for todo by name"
        onChange={(event) => {
          updateTodos(allTodos.filter(todo => (
            !todo.title && typeof todo.title === 'object' ? ''
              : todo.title.toLowerCase()
                .includes(event.target.value.toLocaleLowerCase()))));
        }}
      />
      <button
        type="button"
        onClick={() => {
          const randomNumber = Math.floor(Math.random() * allTodos.length);
          const randomArrTodo = [];

          // eslint-disable-next-line no-plusplus
          for (let i = randomNumber; i < allTodos.length; i++) {
            randomArrTodo.push(allTodos[i]);
          }

          // eslint-disable-next-line no-plusplus
          for (let i = randomNumber - 1; i >= 0; i--) {
            randomArrTodo.push(allTodos[i]);
          }

          updateTodos(randomArrTodo);
        }}
      >
        Randomize
      </button>
    </div>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            className={
              classnames('TodoList__item', `${todo.completed
                ? 'TodoList__item--checked'
                : 'TodoList__item--unchecked'}`)
            }
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  updateTodos(filteredTodos.map(newTodo => (
                    newTodo.id === todo.id
                      ? {
                        ...newTodo, completed: !todo.completed,
                      } : newTodo)));
                }}
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
              onClick={() => {
                updateUserId(`${todo.userId}`);
              }}
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

TodoList.propTypes = {
  allTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateUserId: PropTypes.func.isRequired,
  updateTodos: PropTypes.func.isRequired,
};
