import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const TodoList = ({
  todos,
  selectUser,
  query,
  status,
}) => {
  let filteredTodos = todos.filter(
    todo => todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  switch (status) {
    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;
    case 'active':
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;
    default:
      break;
  }

  return (
    <div className="TodoList">
      <div className="TodoList__list-container">

        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={cn({
                'TodoList__item TodoList__item--checked': todo.completed,
                'TodoList__item TodoList__item--unchecked': !todo.completed,
              })}
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
                className="TodoList__user-button button"
                type="button"
                onClick={() => selectUser(todo.userId)}
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
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectUser: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
