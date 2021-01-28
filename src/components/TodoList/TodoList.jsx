import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    selectedFilter: 'All',
  }

  render() {
    let { todos } = this.props;
    const { query, selectedFilter } = this.state;

    todos = todos
      .filter(todo => todo.title.includes(query))
      .filter((todo) => {
        if (selectedFilter === 'Active') {
          return !todo.completed;
        }

        if (selectedFilter === 'Completed') {
          return todo.completed;
        }

        return todo;
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <label htmlFor="todoInput">
          Todo title:&nbsp;
          <input
            value={query}
            id="todoInput"
            placeholder="Input a title of todo"
            onChange={event => this.setState({ query: event.target.value })}
          />
        </label>

        <select
          value={selectedFilter}
          onChange={event => (
            this.setState({ selectedFilter: event.target.value })
          )}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item
                  TodoList__item--${todo.completed ? 'checked' : 'unchecked'}
                `}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                    onChange={() => this.props.onComplete(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => this.props.onUserSelect(todo.userId)}
                >
                  User&nbsp;#
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
  todos: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  onComplete: PropTypes.func.isRequired,
  onUserSelect: PropTypes.func.isRequired,
};
