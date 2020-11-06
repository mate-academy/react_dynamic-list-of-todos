import React, { useState } from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

const TodoList = ({ allTodos, onUserSelect }) => {
  const [todos, setTodos] = useState(allTodos);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const categoryFilters = {
    all: () => true,
    active: todo => !todo.completed,
    completed: todo => todo.completed,
  };

  const onComplete = (event) => {
    const { value } = event.target;

    setCategory(value);

    filterTodos(query, value);
  };

  const onSearch = (event) => {
    const { value } = event.target;

    setQuery(value);

    filterTodos(value, category);
  };

  const filterTodos = (searchQuery, selectedCategory) => {
    setTodos([...allTodos]
      .filter(todo => todo.title.toLowerCase().includes(
        searchQuery.toLowerCase(),
      ) && categoryFilters[selectedCategory](todo)));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <form className="TodoList__form">
        <input
          type="text"
          id="search-query"
          className="TodoList__enter"
          placeholder="Enter"
          onChange={onSearch}
        />

        <select
          name="todosFilter"
          onChange={onComplete}
        >
          <option value="all">
            All todos
          </option>
          <option value="active">
            Active todos
          </option>
          <option value="completed">
            Completed todos
          </option>
        </select>

      </form>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`TodoList__item
                TodoList__item--${todo.completed ? '' : 'un'}checked`
              }
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className="TodoList__user-button button"
                type="button"
                onClick={() => onUserSelect(todo.userId)}
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

TodoList.defaultProps = {
  allTodos: [{
    userId: 0,
    completed: false,
  }],
};

TodoList.propTypes = {
  allTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }),
  ),
  onUserSelect: PropTypes.func.isRequired,
};

export { TodoList };
