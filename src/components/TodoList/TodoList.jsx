import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class TodoList extends React.Component {
  state = {
    titleQuery: '',
    completedMode: 'all',
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      userId: PropTypes.number,
      completed: PropTypes.bool,
      id: PropTypes.number.isRequired,
    })).isRequired,
    onUserSelect: PropTypes.func.isRequired,
    todosLoaded: PropTypes.bool.isRequired,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  filterByTitle = (todo) => {
    if (todo.title === null) {
      return false;
    }

    return todo.title.toLowerCase()
      .includes(this.state.titleQuery.toLowerCase());
  }

  filterByStatus = (todo) => {
    const { completedMode } = this.state;

    switch (completedMode) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default:
        return true;
    }
  }

  render() {
    const { todos, onUserSelect, todosLoaded } = this.props;
    const { titleQuery, completedMode } = this.state;

    const filteredTodos = todos
      .filter(this.filterByTitle)
      .filter(this.filterByStatus);

    return (
      <div className="TodoList">
        {todosLoaded
          ? (<h2>Todos:</h2>)
          : (<p>Error occured while loading users</p>)
        }

        <div className="TodoList__list-container">
          <label htmlFor="titleQuery">
            Filter todos:&nbsp;
            <input
              type="text"
              name="titleQuery"
              id="titleQuery"
              autoComplete="off"
              value={titleQuery}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="completedMode">
            Show:&nbsp;
            <select
              name="completedMode"
              id="completedMode"
              value={completedMode}
              onChange={this.handleChange}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
            </select>

          </label>

          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classnames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
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
                  className={classnames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': true },
                  )}
                  onClick={() => {
                    onUserSelect(todo.userId);
                  }}
                  type="button"
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
