import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './TodoList.scss';

export const TodoList = props => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">

      <input
        type="text"
        placeholder="Find"
        onChange={(event) => {
          props.finder(event.target.value);
        }}
      />

      <select
        onChange={(event) => {
          props.completedTodo(event.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="">Active</option>
        <option value="completed">Completed</option>
      </select>

      <button
        type="button"
        onClick={() => {
          props.randomOrder();
        }}
      >
        Random Order
      </button>

      <ul className="TodoList__list">

        {
          props.todos.map(todo => (
            <li
              key={todo.id}
              className={ClassNames(
                'TodoList__item',
                { ' TodoList__item TodoList__item--checked': todo.completed },
                {
                  ' TodoList__item TodoList__item--unchecked':
                      !todo.completed,
                },
              )}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed === true}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={ClassNames(
                  'TodoList__user-button button',
                  { ' TodoList__user-button--selected':
                        props.selectedTodo === todo.id },
                )}
                type="button"
                onClick={() => {
                  props.selectedUSer(todo.userId, todo.id);
                }}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))
        }

      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  finder: PropTypes.func.isRequired,
  completedTodo: PropTypes.func.isRequired,
  selectedUSer: PropTypes.func.isRequired,
  randomOrder: PropTypes.func.isRequired,
  selectedTodo: PropTypes.number.isRequired,
};
