import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({
  todos,
  onUserSelect,
  onChangeSearchField,
  onChangeSelect,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <div className="TodoList__form">
        <input
          className="TodoList__search"
          type="text"
          onChange={(event) => {
            onChangeSearchField(event.target.value);
          }}
        />
        <select
          className="TodoList__search"
          name="completed"
          onChange={(event) => {
            onChangeSelect(event.target.value);
          }}
        >
          <option value="all">all</option>
          <option value="false">active</option>
          <option value="true">completed</option>
        </select>
      </div>

      <ul className="TodoList__list">
        {todos.map(({ id, userId, title, completed }) => (
          <li
            className={cn(
              'TodoList__item',
              {
                'TodoList__item--unchecked': !completed,
                'TodoList__item--checked': completed,
              },
            )}
            key={id}
          >
            <label>
              <input type="checkbox" checked={completed} readOnly />
              <p>{title}</p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
              onClick={() => onUserSelect(userId)}
            >
              User&nbsp;#
              {userId}
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
    title: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
  })).isRequired,
  onUserSelect: PropTypes.func.isRequired,
  onChangeSearchField: PropTypes.func.isRequired,
  onChangeSelect: PropTypes.func.isRequired,
};
