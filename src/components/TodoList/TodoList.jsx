import React, { Component } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends Component {
  state = {
    completed: 'all',
  }

  filterTodosByTitle = ({ target }) => {
    const { todos } = this.props;
    const filtered = todos
      .filter(todo => todo.title && todo.title.includes(target.value));

    this.setState({
      todos: filtered,
    });
  }

  filterTodosByСompleteness = ({ target }) => {
    const { todos } = this.props;

    if (target.value === 'all') {
      this.setState({
        completed: target.value,
        todos,
      });
    } else {
      const filtered = todos
        .filter(todo => String(todo.completed) === target.value);

      this.setState({
        completed: target.value,
        todos: filtered,
      });
    }
  }

  Randomize = () => {
    const { todos } = this.props;
    const rendom = [...todos].sort(() => 0.5 - Math.random());

    this.setState({
      todos: rendom,
    });
  }

  render() {
    const { onUserSelected, todoID, selectedUserId } = this.props;
    const { completed } = this.state;
    const todos = this.state.todos || this.props.todos;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <div className="TodoList__form">
            <input
              className="TodoList__search"
              type="text"
              onChange={this.filterTodosByTitle}
            />
            <select
              className="TodoList__search"
              name="completed"
              value={completed}
              onChange={this.filterTodosByСompleteness}
            >
              <option value="all">all</option>
              <option value="false">active</option>
              <option value="true">completed</option>
            </select>
            <button
              type="button"
              onClick={this.Randomize}
            >
              Randomize
            </button>
          </div>
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                className={
                  classNames('TodoList__item TodoList__item--checked', {
                    'TodoList__item--unchecked': !todo.completed,
                  })
                }
                key={todo.id}
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
                  className={classNames('TodoList__user-button button', {
                    'TodoList__user-button--selected':
                    todo.id === todoID && selectedUserId !== 0,
                  })}
                  type="button"
                  onClick={() => onUserSelected(todo.userId, todo.id)}
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
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })),
  onUserSelected: PropTypes.func.isRequired,
  todoID: PropTypes.number.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
