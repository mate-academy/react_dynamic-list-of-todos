import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Search } from '../Search/Search';
import { Select } from '../Select/Select';

import './TodoList.scss';

export const TodoList = ({
  todos,
  query,
  isTaskDone,
  selectedTask,
  handleUser,
  handleStatus,
  checkQuery,
}) => {
  const filtredTasks = todos.filter(({ title, completed }) => {
    const comtareText = () => title.toLowerCase().includes(query);

    if (isTaskDone === 'true') {
      return comtareText() && completed;
    }

    if (isTaskDone === 'false') {
      return comtareText() && !completed;
    }

    return comtareText();
  });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <Search checkQuery={checkQuery} />
      <Select handleStatus={handleStatus} />

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filtredTasks.map(({ id, title, completed, userId }) => (
            <li
              key={id}
              className={classNames(
                'TodoList__item', {
                  'TodoList__item--unchecked': !completed,
                  'TodoList__item--checked': completed,
                },
              )}
            >
              <label>
                <input
                  type="checkbox"
                  checked={completed}
                  readOnly
                />
                <p>{title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  { 'TodoList__user-button--selected': selectedTask === title },
                  'button',
                )}
                type="button"
                onClick={() => handleUser(userId, title)}
              >
                {`User${'\u00A0'}#${userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      userId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  query: PropTypes.string.isRequired,
  isTaskDone: PropTypes.string.isRequired,
  selectedTask: PropTypes.string.isRequired,
  handleUser: PropTypes.func.isRequired,
  handleStatus: PropTypes.func.isRequired,
  checkQuery: PropTypes.func.isRequired,
};
