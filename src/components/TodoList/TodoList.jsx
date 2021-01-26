import React from 'react';
import './TodoList.scss';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

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
    const { todos, checkTask, selectUser } = this.props;
    const { query, selectedTodos } = this.state;
    const visibleTodos = todos
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
        if (selectedTodos === 'Active') {
          return !todo.completed;
        }

        if (selectedTodos === 'Completed') {
          return todo.completed;
        }

        return todo;
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <label>
          Filters:
          {' '}
          <input
            type="text"
            className="TodoList__name-filter"
            name="query"
            value={query}
            onChange={this.handleChange}
            placeholder="Search by title"
          />
        </label>
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
                key={todo.id}
                className={ClassNames('TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed })}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {
                      checkTask(todo.id);
                    }}
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
    userId: PropTypes.number,
    title: PropTypes.string,
  }).isRequired).isRequired,
  selectUser: PropTypes.func.isRequired,
};
