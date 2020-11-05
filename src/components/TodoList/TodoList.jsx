import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoList.scss';

export class TodoList extends React.PureComponent {
  state = {
    query: '',
    status: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const { filterTodosByTitle, filterTodosByStatus } = this.props;

    this.setState({
      [name]: value,
    });

    if (name === 'query') {
      filterTodosByTitle(value);

      return;
    }

    if (name === 'status') {
      filterTodosByStatus(value);
    }
  }

  render() {
    const { query, status } = this.state;
    const { selectUser, shuffleTodos, todos } = this.props;

    return (
      <div className="TodoList">
        <div>
          <input
            className="input"
            type="text"
            name="query"
            value={query}
            onChange={this.handleChange}
          />

          <select
            name="status"
            value={status}
            onChange={this.handleChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <button
            className="button"
            type="button"
            onClick={shuffleTodos}
          >
            Shuffle
          </button>
        </div>

        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={
                  classNames(
                    'TodoList__item',
                    { 'TodoList__item--checked': todo.completed },
                    { 'TodoList__item--unchecked': !todo.completed },
                  )
                }
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
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
                  onClick={() => selectUser(todo.userId)}
                >
                  {`User # ${todo.userId}`}
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
  filterTodosByTitle: PropTypes.func.isRequired,
  filterTodosByStatus: PropTypes.func.isRequired,
  shuffleTodos: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
