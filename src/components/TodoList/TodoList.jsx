import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    title: '',
    status: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { todos, selectUser, userId, changeStatus } = this.props;
    const { title, status } = this.state;
    let filterTodos = todos;

    if (title) {
      filterTodos = todos.filter(
        todo => todo.title && (
          todo.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())),
      );
    }

    switch (status) {
      case 'Active':
        filterTodos = filterTodos.filter(
          todo => todo.completed !== null && !todo.completed,
        );
        break;
      case 'Completed':
        filterTodos = filterTodos.filter(
          todo => todo.completed,
        );
        break;
      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <label htmlFor="input-todo">
          <input
            id="input-todo"
            name="title"
            placeholder="search todo"
            value={title}
            onChange={this.handleChange}
          />
        </label>

        <select
          name="status"
          value={status}
          onChange={this.handleChange}
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filterTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => changeStatus(todo.id)}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  type="button"
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected': todo.userId === userId,
                    },
                  )}
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool,
    userId: PropTypes.number,
  })).isRequired,

  selectUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  changeStatus: PropTypes.func.isRequired,
};
