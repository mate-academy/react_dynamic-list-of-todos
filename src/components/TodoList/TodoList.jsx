import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

const classNames = require('classnames');

export class TodoList extends React.Component {
  state = {
    query: '',
    selectedTodos: 'all',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { todos, onUserSelected, selectedUserId } = this.props;
    const { query, selectedTodos } = this.state;

    const findTodos = todos.filter(todo => (
      todo.title !== null
      && todo.title.toLowerCase().includes(query.toLowerCase())
    ));
    const filterTodos = findTodos.filter((todo) => {
      switch (selectedTodos) {
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
            {filterTodos.map(todo => (
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
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  className={classNames({
                    'TodoList__user-button': true,
                    'button': true,
                    'TodoList__user-button--selected': todo.userId === selectedUserId,
                  })}

                  type="button"
                  onClick={() => {
                    onUserSelected(todo.userId);
                  }}
                >
                  User&nbsp;#{todo.userId}
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
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired).isRequired,
  onUserSelected: PropTypes.func.isRequired,
};
