import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    titleFilter: '',
    sortTodos: 'all',
  }

  titleChange = (event) => {
    this.setState({ titleFilter: event.target.value });
  }

  todosSort = (event) => {
    this.setState({ sortTodos: event.target.value });
  }

  render() {
    const { todos, selectedUser } = this.props;

    const preparedTodos = todos.filter(todo => todo.title && todo
      .title.includes(this.state.titleFilter))
      .filter((todo) => {
        switch (this.state.sortTodos) {
          case 'completed':
            return todo.completed === true;
          case 'active':
            return todo.completed === false;
          default:
            return todo;
        }
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          onChange={this.titleChange}
          placeholder="Enter the title"
        />

        <select
          value={this.state.sortTodos}
          onChange={this.todosSort}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {preparedTodos.map(({ id, userId, title, completed }) => (
              <li
                className={classnames(
                  'TodoList__item', completed
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked',
                )}
                key={id}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{title}</p>
                </label>
                <button
                  type="button"
                  className={classnames(
                    'button TodoList__user-button',
                    selectedUser.id === userId
                      && 'TodoList__user-button--selected',
                  )}
                  onClick={() => selectedUser(userId)}
                >
                  User&nbsp;#
                  {userId}
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
  selectedUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
