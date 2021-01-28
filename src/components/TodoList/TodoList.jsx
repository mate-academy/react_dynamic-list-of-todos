import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    selectedTasks: 'all',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { todos, chooseUser, selectedUser, checkboxHandler } = this.props;
    const { query, selectedTasks } = this.state;

    const currentTodos = todos
      .filter(todo => todo.title !== '' && todo.userId !== null)
      .filter((todo) => {
        if (query) {
          return (
            todo.title.toLowerCase().includes(query.toLowerCase())
          );
        }

        return todo;
      })
      .filter((todo) => {
        if (selectedTasks === 'Active') {
          return !todo.completed;
        }

        if (selectedTasks === 'Completed') {
          return todo.completed;
        }

        return todo;
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <label>
          Filters:
          {' '}
          <input
            type="text"
            className="TodoList__name-filter"
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
            placeholder="Search by title"
          />
        </label>
        <select
          name="selectedTasks"
          value={this.state.selectedTasks}
          onChange={this.handleChange}
        >
          <option>All</option>
          <option>Active</option>
          <option>Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {currentTodos.map(todo => (
              <li
                key={todo.id}
                className={ClassNames('TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed })}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                    onChange={() => {
                      checkboxHandler(todo.id);
                    }}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={ClassNames(
                    'TodoList__user-button',
                    'button',
                    // eslint-disable-next-line max-len
                    { 'TodoList__user-button--selected': todo.userId === selectedUser },
                  )}
                  type="button"
                  onClick={() => {
                    chooseUser(todo.userId);
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
    title: PropTypes.string,
  })).isRequired,
  selectedUser: PropTypes.number.isRequired,
  chooseUser: PropTypes.func.isRequired,
  checkboxHandler: PropTypes.func.isRequired,
};
