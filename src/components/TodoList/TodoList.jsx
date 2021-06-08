import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    titleFilter: '',
    statusFilter: '',
  };

  render() {
    const { titleFilter, statusFilter } = this.state;
    const {
      todos,
      onUserIdSelected,
      selectedUserId, 
    } = this.props;

    const todosToDisplay = todos
      .filter(todo => todo.title)
      .filter(todo => todo.title.includes(titleFilter))
      .filter(todo => {
        switch (statusFilter) {
          case 'active':
          return !todo.completed;

          case 'completed':
          return todo.completed;

          case 'all':
          default:
          return todo;
        }
      });
    
    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <label htmlFor="filterByTitle">
          <span>
            Filter todos by title
          </span>
          <input
            type="text"
            id="filterByTitle"
            placeholder="Enter a query"
            value={titleFilter}
            onChange={(event) => {
              this.setState({ titleFilter: event.target.value})
            }}
          />
        </label>

        <select
          value={statusFilter}
          onChange={(event) => {
            this.setState({ statusFilter: event.target.value})
            }}
        >
          <option value="all">
            Show all todos
          </option>
          <option value="active">
            Show active todos
          </option>
          <option value="completed">
            Show completed todos
          </option>
        </select>
    
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosToDisplay.map(todo => (
              <li
                key={todo.id}
                className={classNames({
                  'TodoList__item': true,
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly 
                />
                <p>
                  {todo.title}
                </p>
              </label>
    
              <button
                type="button"
                className={classNames({
                  'button': true,
                  'TodoList__user-button': true,
                  'TodoList__user-button--selected': selectedUserId === todo.userId,
                })}
                onClick={() => {
                  onUserIdSelected(todo.userId)
                }}
              >
                User&nbsp;#{todo.userId}
              </button>
            </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
} ;

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  onUserIdSelected: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
