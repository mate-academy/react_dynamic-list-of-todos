import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    input: '',
    select: 'All',
  }

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  filterTodos = (todos) => {
    const { input, select } = this.state;
    const todoContainsInput = todos.filter((todo) => {
      if (todo.title) {
        return todo.title.includes(input);
      }

      return false;
    });

    switch (select) {
      case 'Active':
        return todoContainsInput.filter(todo => !todo.completed);
      case 'Completed':
        return todoContainsInput.filter(todo => todo.completed);
      default:
        return todoContainsInput;
    }
  }

  render() {
    const { todos, selectedUserChanger, currentUserId } = this.props;
    const { input, select } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          name="input"
          value={input}
          placeholder="Search by title"
          onChange={this.changeHandler}
        />

        <select
          name="select"
          value={select}
          onChange={this.changeHandler}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.filterTodos(todos).map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
                key={todo.id}
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
                      todo.userId === currentUserId },
                  )}
                  type="button"
                  onClick={() => {
                    selectedUserChanger(todo.userId);
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
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })).isRequired,
  selectedUserChanger: PropTypes.func.isRequired,
  currentUserId: PropTypes.number.isRequired,
};
