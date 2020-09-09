import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';

export class TodoList extends React.Component {
  state = {
    searchTodoByTitle: '',
    searchTodoByCompleteness: 'all',
  };

  render() {
    const { todos, onSelectUser, selectedUserId } = this.props;
    const { searchTodoByTitle, searchTodoByCompleteness } = this.state;

    let sortedTodos = todos.filter((todo) => {
      if (!searchTodoByTitle) {
        return todo;
      }

      if (todo.title !== null) {
        return todo.title.toLowerCase()
          .includes(searchTodoByTitle.toLowerCase());
      }

      if (searchTodoByCompleteness === 'active') {
        return !todo.completed;
      }

      if (searchTodoByCompleteness === 'completed') {
        return todo.completed;
      }

      return null;
    });

    sortedTodos = sortedTodos.filter((todo) => {
      if (searchTodoByCompleteness === 'active') {
        return !todo.completed;
      }

      if (searchTodoByCompleteness === 'completed') {
        return todo.completed;
      }

      return todo;
    });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <section className="TodoList__filters">
          <input
            className="TodoList__find"
            type="text"
            name="search"
            autoComplete="off"
            onChange={event => this.setState({
              searchTodoByTitle: event.target.value,
            })}
          />

          <select
            className="TodoList__select"
            value={searchTodoByCompleteness}
            onChange={event => this.setState({
              searchTodoByCompleteness: event.target.value,
            })}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </section>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {sortedTodos.map(todo => (
              <li
                key={todo.id}
                className={cn('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
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
                  className={cn('TodoList__user-button', 'button', {
                    'TodoList__user-button--selected':
                    selectedUserId === todo.userId,
                  })}
                  type="button"
                  onClick={() => onSelectUser(todo.userId)}
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
      title: PropTypes.string,
      userId: PropTypes.number,
      completed: PropTypes.bool,
    }),
  ),
  onSelectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number,
};

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: '',
      userId: '',
      completed: null,
    }),
  ),
  selectedUserId: 0,
};
