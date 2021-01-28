import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    todoId: 0,
    searchTitle: '',
    selectBy: '',
  };

  selectTodo = (todoId) => {
    this.setState({ todoId });
  }

  updateSearchTitle = (event) => {
    this.setState({ searchTitle: event.target.value });
  }

  updateStatus = (event) => {
    this.setState({ selectBy: event.target.value });
  }

  filterByStatus = (todo) => {
    const { selectBy } = this.state;

    switch (selectBy) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  }

  filterByTitle = (todo) => {
    const { searchTitle } = this.state;

    return todo.title
      ? todo.title.toLowerCase().includes(searchTitle.toLowerCase())
      : false;
  }

  render() {
    const {
      todos,
      selectUser,
    } = this.props;

    const { todoId, search } = this.state;
    const visibleTodos = todos
      .filter(this.filterByTitle)
      .filter(this.filterByStatus);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <form className="TodoList__form">
          <div className="TodoList__form-field">
            <label htmlFor="search-query">
              Find Task:&nbsp;
            </label>
            <input
              type="text"
              id="search-query"
              placeholder="Type search word"
              value={search}
              onChange={this.updateSearchTitle}
            />
          </div>
          <div className="TodoList__form-field">
            <label htmlFor="select-todo">
              Filter by status:&nbsp;
            </label>
            <select
              id="select-todo"
              onChange={this.updateStatus}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </form>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={classnames(`TodoList__item`, {
                  'TodoList__item--unchecked': todo.completed === false,
                  'TodoList__item--checked': todo.completed === true,
                })}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                  />
                  <p>
                    {`
                    ${todo.title} - ${todo.completed ? 'Completed' : 'Active'}
                    `}
                  </p>
                </label>
                <button
                  className={classnames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected': todo.id === todoId,
                    },
                  )}
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                    this.selectTodo(todo.id);
                  }}
                >
                  User Info
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
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
};
