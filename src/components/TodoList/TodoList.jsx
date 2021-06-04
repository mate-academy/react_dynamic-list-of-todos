import React from 'react';

import './TodoList.scss';

import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.PureComponent {
  render() {
    const {
      visibleTodos,
      onUserSelected,
      selectedUserId,
      completedFilter,
      searchQuery,
      onHandleChange,
    } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div>
          <input
            value={searchQuery}
            name="searchQuery"
            onChange={onHandleChange}
            type="text"
            placeholder="Type something for filtering todos"
          />

          <select
            name="completedFilter"
            value={completedFilter}
            onChange={onHandleChange}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames({
                  TodoList__item: true,
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                {todo.userId && (
                  <button
                    className={classNames({
                      button: true,
                      'TodoList__user-button': true,
                      'TodoList__user-button--selected':
                        selectedUserId === todo.userId,
                    })}
                    type="button"
                    onClick={() => onUserSelected(todo.userId)}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  visibleTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
      userId: PropTypes.number,
    }),
  ),
  selectedUserId: PropTypes.number.isRequired,
  onUserSelected: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  completedFilter: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

TodoList.defaultProps = {
  visibleTodos: [],
};
