import React, { Component } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends Component {
  state = {
    status: 'All',
    title: '',
  }

  handleSelect = (event) => {
    this.setState({ status: event.target.value });
  }

  handleChange = (event) => {
    this.setState({ title: event.target.value.toLowerCase() });
  }

  render() {
    const { setUser, changeStatus } = this.props;
    const { status, title } = this.state;
    let { todos } = this.props;

    switch (status) {
      case 'Completed':
        todos = todos.filter(todo => todo.completed);
        break;
      case 'Not completed':
        todos = todos.filter(todo => !todo.completed);
        break;
      default:
        break;
    }

    if (title) {
      todos = todos.filter(todo => todo.title.includes(title));
    }

    return (
      <div className="TodoList">
        <input
          type="text"
          placeholder="Search by title"
          onChange={this.handleChange}
        />
        <select
          value={status}
          onChange={this.handleSelect}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not completed">Not completed</option>
        </select>
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames({
                  TodoList__item: true,
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                    onClick={() => changeStatus(todo.id)}
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
                  onClick={() => setUser(todo.userId)}
                >
                  {`User #${todo.userId}`}
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
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  setUser: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};
