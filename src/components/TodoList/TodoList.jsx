import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoList.scss';

export class TodoList extends React.PureComponent {
  state = {
    selectedTodo: 0,
    title: '',
    select: 'all',
  }

  selectTodo = (selectedTodo) => {
    this.setState({ selectedTodo });
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  render() {
    const {
      todos,
      selectUser,
    } = this.props;

    const {
      selectedTodo,
      title,
      select,
    } = this.state;

    const filteredByStatus = todos.filter((todo) => {
      switch (select) {
        case 'all':
          return todo;

        case 'completed':
          return todo.completed;

        case 'active':
          return !todo.completed;

        default:
          return todo;
      }
    });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <label htmlFor="title-input">
            Search by title:
            <input
              className="TodoList__title-input"
              placeholder="filter todos"
              name="title"
              id="title-input"
              type="text"
              value={title}
              onChange={(event) => {
                const { name, value } = event.target;

                this.handleChange(name, value);
              }}
            />
            <select
              className="TodoList__select"
              name="select"
              value={select}
              onChange={(event) => {
                const { name, value } = event.target;

                this.handleChange(name, value);
              }}
            >
              <option>all</option>
              <option>active</option>
              <option>completed</option>
            </select>
          </label>
          <ul className="TodoList__list">
            {filteredByStatus.map(todo => (
              todo.title.includes(title) && (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label>
                  <input
                    className={classNames('input')}
                    type="checkbox"
                    checked={todo.completed}
                  />
                  <p>
                    {todo.title}
                  </p>
                </label>

                <button
                  className={classNames('button', {
                    'TodoList__user-button--selected': todo.id === selectedTodo,
                  })}
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                    this.selectTodo(todo.id);
                  }}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
              )
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
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ),
  selectUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
