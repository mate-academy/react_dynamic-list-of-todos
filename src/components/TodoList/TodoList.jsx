/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    todos: this.props.todos,
    initialTodos: this.props.todos,
    selectedUserId: this.props.selectedUserId,
    updateSelectedUserId: this.props.updateSelectedUserId,
    titleFilterQuery: '',
    statusFilterQuery: 'all',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todos !== this.props.todos) {
      this.setState({
        todos: this.props.todos,
        initialTodos: this.props.todos,
      });
    }

    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.setState({
        selectedUserId: this.props.selectedUserId,
      });
    }
  }

  onTitleFilterChange = (event) => {
    const titleFilterQuery = event.target.value;
    const rawTodos = this.state.initialTodos;

    const todos = rawTodos
      .filter(todo => todo.title && todo.title.includes(titleFilterQuery));

    this.setState({
      titleFilterQuery,
      todos,
    });
  }

  onStatusFilterChange = (event) => {
    const statusFilterQuery = event.target.value;
    const rawTodos = this.state.initialTodos;

    let todos;

    switch (statusFilterQuery) {
      case 'active':
        todos = rawTodos.filter(todo => todo.completed === false);
        break;
      case 'completed':
        todos = rawTodos.filter(todo => todo.completed === true);
        break;

      default:
        todos = [...rawTodos];
        break;
    }

    this.setState({
      statusFilterQuery,
      todos,
    });
  }

  render() {
    const { onTitleFilterChange, onStatusFilterChange } = this;
    const { todos, selectedUserId, updateSelectedUserId,
      titleFilterQuery, statusFilterQuery } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          placeholder="filter query"
          value={titleFilterQuery}
          onChange={onTitleFilterChange}
        />

        <select
          value={statusFilterQuery}
          onChange={onStatusFilterChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        {todos.length ? (
          <div className="TodoList__list-container">
            <ul className="TodoList__list">
              {todos.map(todo => (
                <li
                  key={todo.id}
                  className={
                    `TodoList__item TodoList__item--${todo.completed
                      ? 'checked' : 'unchecked'}`
                  }
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
                    type="button"
                    onClick={() => {
                      updateSelectedUserId(todo.userId);
                    }}
                    className={classnames(
                      'TodoList__user-button',
                      'button',
                      // eslint-disable-next-line max-len
                      { 'TodoList__user-button--selected': todo.userId === selectedUserId },
                    )}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>There are no todos. Do something to fix it</div>
        )}
      </div>
    );
  }
}

TodoList.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  updateSelectedUserId: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};
