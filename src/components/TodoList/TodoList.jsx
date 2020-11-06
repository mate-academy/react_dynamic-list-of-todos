import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({
  todos,
  selectedUser,
  filterOnInput,
  filterBySelect,
  valueOnInput,
  valueOnSelect,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <div className="TodoList__filter">
        <input
          className="TodoList__input"
          type="text"
          name="valueOnInput"
          placeholder="Title"
          value={valueOnInput}
          onChange={filterOnInput}
        />
        <select
          className="TodoList__select"
          name="valueOnSelect"
          value={valueOnSelect}
          onChange={filterBySelect}
        >
          <option
            value="all"
          >
            All
          </option>
          <option
            value="not completed"
          >
            Active
          </option>
          <option
            value="completed"
          >
            Completed
          </option>
        </select>
      </div>
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={todo.completed
              ? 'TodoList__item TodoList__item--checked'
              : 'TodoList__item TodoList__item--unchecked'}
          >
            <label>
              {todo.completed
                ? <input type="checkbox" checked readOnly />
                : <input type="checkbox" readOnly />
              }
              <p>{todo.title}</p>
            </label>
            <button
              className="TodoList__user-button button"
              type="button"
              onClick={() => selectedUser(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool,
    userId: PropTypes.number,
    title: PropTypes.string,
  }).isRequired).isRequired,
  selectedUser: PropTypes.func.isRequired,
  filterOnInput: PropTypes.func.isRequired,
  filterBySelect: PropTypes.func.isRequired,
  valueOnInput: PropTypes.string,
  valueOnSelect: PropTypes.string,
};

TodoList.defaultProps = {
  valueOnInput: '',
  valueOnSelect: 'all',
};
