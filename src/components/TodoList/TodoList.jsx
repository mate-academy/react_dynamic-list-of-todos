import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    sortBy: 'all',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { todos, onCheck, onSelect } = this.props;
    const { query, sortBy } = this.state;

    const filteredTodos = todos
      .filter((todo) => {
        if (query) {
          return (
            todo.title !== null
            && todo.title.toLowerCase().includes(query.toLowerCase())
          );
        }

        return todo;
      })
      .filter((todo) => {
        if (sortBy === 'active') {
          return !todo.completed;
        }

        if (sortBy === 'completed') {
          return todo.completed;
        }

        return todo;
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <label>
          <input
            type="text"
            name="query"
            value={query}
            onChange={this.handleChange}
            placeholder="Search by title"
          />
        </label>

        <select
          name="sortBy"
          value={sortBy}
          onChange={this.handleChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={ClassNames('TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed })}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onCheck(todo.id)}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={ClassNames(
                    'TodoList__user-button', 'button',
                    { 'TodoList__user-button--selected': !todo.completed },
                  )}
                  type="button"
                  onClick={() => onSelect(todo.userId)}
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
    id: PropTypes.number,
    completed: PropTypes.bool,
    userId: PropTypes.number,
    title: PropTypes.string,
  }).isRequired).isRequired,
  onSelect: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
};
