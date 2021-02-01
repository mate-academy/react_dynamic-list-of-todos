import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    selectedTodos: 'All',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { todos, selectUser, changeTaskStatus } = this.props;
    const { query, selectedTodos } = this.state;

    const visibleTodos = todos.filter(todo => (
      todo.title !== null
      && todo.title.toLowerCase().includes(query.toLowerCase())
    )).filter((todo) => {
      switch (this.state.selectedTodos) {
        case 'Active':
          return !todo.completed;
        case 'Completed':
          return todo.completed;
        default:
          return todo;
      }
    });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <label>
          Search task:
          {' '}
          <input
            type="text"
            className="TodoList__name-filter"
            name="query"
            value={query}
            onChange={this.handleChange}
            id="search-query"
            placeholder="Enter the title"
          />
        </label>
        {' '}
        <select
          name="selectedTodos"
          value={selectedTodos}
          onChange={this.handleChange}
        >
          <option>All</option>
          <option>Active</option>
          <option>Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => changeTaskStatus(todo.id)}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': !todo.completed },
                  )}
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                >
                  User
                  {' '}
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  selectUser: PropTypes.isRequired,
  changeTaskStatus: PropTypes.isRequired,
};
