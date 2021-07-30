import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import propTypes from 'prop-types';

export const TodoList = ({
  todos,
  onCLick,
  title,
  onChange,
  selectedByStatus,
  onChangeByStatus,
}) => {
  const unchecked = 'TodoList__item--unchecked';
  const checked = 'TodoList__item--checked';

  return (
    <div className="TodoList">
      <h2>Todos</h2>
      <p>Filter Todos by title:</p>
      <input
        className="input"
        value={title}
        onChange={onChange}
        placeholder="Type Search Word"
      />
      <p>Filter Todos by status:</p>
      <select
        value={selectedByStatus}
        onChange={onChangeByStatus}
      >
        <option value="all">
          all
        </option>
        <option value="active">
          active
        </option>
        <option value="completed">
          completed
        </option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                [checked]: todo.completed === true,
                [unchecked]: todo.completed === false,
              })}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed === true}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className="TodoList__user-button
                TodoList__user-button--selected button"
                type="button"
                onClick={() => onCLick(todo.userId)}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      title: propTypes.string.isRequired,
      completed: propTypes.bool.isRequired,
      userId: propTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onCLick: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  selectedByStatus: propTypes.string.isRequired,
  onChangeByStatus: propTypes.func.isRequired,
};
