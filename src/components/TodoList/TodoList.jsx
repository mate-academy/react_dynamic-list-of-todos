import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    filterValue: '',
    display: 'All',
  }

  render() {
    const { todos, onSelectUser, userId } = this.props;
    const { filterValue, display } = this.state;

    let visibleTodos = todos
      .filter(todo => todo.title)
      .filter(todo => todo.title.includes(filterValue));

    switch (display) {
      case 'Completed':
        visibleTodos = visibleTodos.filter(todo => todo.completed === true);
        break;

      case 'Active':
        visibleTodos = visibleTodos.filter(todo => todo.completed === false);
        break;
      default:
        break;
    }

    return (
      <div className="TodoList">
        <p>Filter by Title</p>
        <input
          type="text"
          onChange={(event) => {
            this.setState({
              filterValue: event.target.value,
            });
          }}
        />
        <select
          onChange={(event) => {
            this.setState({
              display: event.target.value,
            });
          }}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Active">Active</option>
        </select>
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={
                  `TodoList__item TodoList__item${todo.completed
                    ? '--checked'
                    : '--unchecked'}`
                }
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
                  className={`
                    TodoList__user-button
                    button
                    ${userId === todo.userId
                    ? 'TodoList__user-button--selected'
                    : ''}
                  `}

                  type="button"
                  onClick={() => {
                    onSelectUser(todo.userId);
                  }}
                >
                  User: #
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
  todos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelectUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
