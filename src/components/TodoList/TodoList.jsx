import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    sortBy: 'All',
  }

  queryChange = (event) => {
    this.setState({ query: event.target.value });
  }

  showFilter = (event) => {
    this.setState({ sortBy: event.target.value });
  }

  render() {
    const { todos, selectedUser, selectedUserId } = this.props;

    let visibleTodos = todos.filter(
      todo => todo.title && todo.title.includes(this.state.query),
    );

    if (this.state.sortBy === 'Active') {
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
    }

    if (this.state.sortBy === 'Completed') {
      visibleTodos = visibleTodos.filter(todo => todo.completed === true);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          value={this.state.query}
          onChange={this.queryChange}
          placeholder="Enter something"
        />
        <select
          value={this.state.sortBy}
          onChange={this.showFilter}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item ${todo.completed
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked'}`}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                {selectedUserId === todo.userId ? (
                  <button
                    className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                    type="button"
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                ) : (
                  <button
                    className="
                    TodoList__user-button
                    button
                  "
                    type="button"
                    onClick={() => {
                      selectedUser(todo.userId);
                    }}
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
  todos: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  selectedUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
