import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const TodoList = ({ todos,
  selectUser,
  selectedUserId,
  title,
  handleChange,
  filterStatus }) => (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <div className="TodoList__list__searchField">
          <p>Filter Todo: </p>
          <input
            type="text"
            name="title"
            placeholder="Search a title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="TodoList__list__searchField">
          <p>Filter by Todo status: </p>
          <select
            name="filterStatus"
            value={filterStatus}
            onChange={handleChange}
          >
            <option value="">Choose status</option>
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <ul className="TodoList__list">
          {todos.map(todo => (
            todo.title
            && (
              <li
                key={todo.id}
                className={classnames('TodoList__item',
                  'TodoList__item--checked',
                  { 'TodoList__item--unchecked': !todo.completed })}
              >
                <label>
                  {todo.completed ? (
                    <input
                      type="checkbox"
                      readOnly
                      checked
                    />
                  ) : (
                    <input
                      type="checkbox"
                      readOnly
                    />
                  )}

                  <p>{todo.title}</p>
                </label>

                  {todo.userId ? (
                    <button
                      className={classnames('button',
                        'TodoList__user-button',
                        { 'TodoList__user-button--selected':
                        todo.userId === selectedUserId })}
                      type="button"
                      onClick={() => {
                        selectUser(todo.userId);
                      }}
                    >
                      User&nbsp;
                      {`#${todo.userId}`}
                    </button>
                  ) : (
                    <button
                      className="button
                        TodoList__user-button
                        TodoList__user-button--disabled"
                      type="button"
                      disabled
                    >
                      Unidentified user
                    </button>
                  )}

              </li>
            )
          ))}
        </ul>
      </div>
    </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  filterStatus: PropTypes.string.isRequired,
};
