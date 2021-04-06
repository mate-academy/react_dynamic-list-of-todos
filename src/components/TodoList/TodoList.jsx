import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    input: '',
    select: 'All',
  };

  handleClick = (todoUserId, selectedUserId, selectUser) => {
    if (todoUserId === selectedUserId) {
      selectUser(0);
    } else {
      selectUser(todoUserId);
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  filterTodos = () => {
    const { input, select } = this.state;
    const filteredTodosSearch = this.props.todos
      .filter(todo => (todo.title ? todo.title.includes(input) : false));

    switch (select) {
      case 'Active':
        return filteredTodosSearch.filter(todo => !todo.completed);

      case 'Completed':
        return filteredTodosSearch.filter(todo => todo.completed);

      default:
      case 'All':
        return filteredTodosSearch;
    }
  }

  render() {
    const { input, select } = this.state;
    const { todos, selectUser, selectedUserId } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          name="input"
          type="text"
          value={input}
          onChange={event => this.handleChange(event)}
        />

        <select
          name="select"
          value={select}
          onChange={event => this.handleChange(event)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.filterTodos(todos).map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>
                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected':
                        todo.userId === selectedUserId },
                  )}
                  type="button"
                  onClick={() => {
                    this.handleClick(todo.userId, selectedUserId, selectUser);
                  }}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
    completed: PropTypes.bool,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
