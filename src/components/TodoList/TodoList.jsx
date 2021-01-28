import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    todoTitle: '',
    todoFilter: 'All',
  }

  handleTodos = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { selectUser, todos } = this.props;
    const { todoFilter, todoTitle } = this.state;
    let filteredTodos;

    switch (todoFilter) {
      case 'Active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'Completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = todos;
        break;
    }

    if (todoTitle.length > 0) {
      filteredTodos = filteredTodos.filter((todo) => {
        if (todo.title) {
          return todo.title.includes(todoTitle);
        }

        return false;
      });
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form action="">
          <input
            type="text"
            name="todoTitle"
            value={todoTitle}
            onChange={this.handleTodos}
          />

          <select
            name="todoFilter"
            value={todoFilter}
            onChange={this.handleTodos}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  todo.completed
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked',
                )}
              >
                <label>
                  <input
                    checked={todo.completed}
                    type="checkbox"
                    readOnly
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
                  {'user '}
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
    title: PropTypes.string,
  })).isRequired,
};
