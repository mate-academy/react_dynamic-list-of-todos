import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({
  todos,
  selectUser,
  query,
  status,
  queryChange,
  statusChange,
}) => {
  let filteredTodos = todos.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));

  if (status === 'active') {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  } else if (status === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  return (
    <>
      <h2>Todos</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
      }}
      >
        <input
          name="filterTodos"
          type="text"
          value={query}
          className="queryTitle"
          placeholder="filter by title"
          onChange={event => (queryChange(event))}
          required
        />
        <select
          name="select"
          value={status}
          onChange={event => statusChange(event)}
        >
          <option value="All">
            Show all
          </option>
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
        </select>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            className={`TodoList__item ${todo.completed === false
              ? 'TodoList__item--unchecked'
              : 'TodoList__item--checked'}`
            }
          >
            <label>
              <input
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
              value={todo.userId}
              onClick={() => selectUser(todo.userId)}
            >
              User&nbsp;
              {todo.userId}
            </button>
          </li>
        ))}
      </form>
    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
  query: PropTypes.string,
  status: PropTypes.string,
  queryChange: PropTypes.func.isRequired,
  statusChange: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  query: '',
  status: '',
};
