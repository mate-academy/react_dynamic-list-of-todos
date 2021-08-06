import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export class TodoList extends Component {
  state = {
    title: '',
    status: 'all',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { todos, selectedUser, selectedUserId } = this.props;
    const { title, status } = this.state;

    const filteredTodoss = todos
      .filter(todo => todo.title
      && todo.title.includes(title))
      .filter((todo) => {
        switch (status) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          case 'all':
          default:
            return true;
        }
      });

    return (

      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          name="title"
          placeholder="Filter by title"
          value={title}
          onChange={this.handleChange}
        />
        <select
          name="status"
          onChange={this.handleChange}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodoss.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item', todo.completed
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked',
                )}
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
                  className={classNames(
                    'TodoList__user-button button',
                    (selectedUserId === todo.userId)
                      && ('TodoList__user-button--selected'),
                  )}
                  type="button"
                  onClick={() => selectedUser(todo.userId)}
                >
                  User&nbsp;
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
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number,
      title: PropTypes.string,
    }),
  ),
  selectedUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
