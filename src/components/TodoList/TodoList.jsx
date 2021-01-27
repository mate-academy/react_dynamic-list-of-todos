import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    statusFilter: 'all',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  filterByQuery = () => {
    const { query } = this.state;

    return (task) => {
      if (query) {
        return (
          task.title !== null
          && task.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      return task;
    };
  }

  filterByStatus = () => {
    const { statusFilter } = this.state;

    return (task) => {
      if (statusFilter === 'Active') {
        return task.completed === false;
      }

      if (statusFilter === 'Completed') {
        return task.completed === true;
      }

      return task;
    };
  }

  render() {
    const { query, statusFilter } = this.state;
    const { todos, selectUser } = this.props;

    const filterTasks = todos
      .filter(this.filterByQuery())
      .filter(this.filterByStatus());

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <form>
          <label>
            Find
            <input
              type="text"
              name="query"
              placeholder="Find task"
              value={query}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Show
            <select
              name="statusFilter"
              value={statusFilter}
              onChange={this.handleChange}
            >
              <option>All</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
          </label>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filterTasks.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
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
  selectUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
  })).isRequired,
};
