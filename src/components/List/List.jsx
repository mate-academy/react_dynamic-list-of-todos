import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

export const List = ({ filterTodos, checkedHandler, selecUser }) => (
  <ul className="TodoList__list">
    {filterTodos.map(todo => (
      <li
        key={todo.id}
        className={className('TodoList__item', {
          'TodoList__item--checked': todo.completed === true,
          ' TodoList__item--unchecked': todo.completed === false,
        })}
      >
        <label>
          <input
            type="checkbox"
            name="completed"
            onChange={() => checkedHandler(todo.id)}
            checked={todo.completed}
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
          onClick={() => {
            selecUser(todo.userId);
          }}
        >
          {`User #${todo.userId}`}
        </button>
      </li>
    ))
    }
  </ul>
);

List.propTypes = {
  filterTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  checkedHandler: PropTypes.func.isRequired,
  selecUser: PropTypes.func.isRequired,
};
