import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    visibleTodos: 'all',
  }

  filterCompleted = {
    all: () => true,
    active: todo => !todo.completed,
    completed: todo => todo.completed,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value.toLowerCase() });
  }

  render() {
    const { query, visibleTodos } = this.state;
    const { todos, selectUser, selectedUserId } = this.props;
    const { handleChange, filterCompleted } = this;

    const filteredTodos = todos
      .filter(todo => todo.title.toLowerCase().includes(query)
        && filterCompleted[visibleTodos](todo));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__inputs">
          <label htmlFor="search">
            Search todo in list:
            <input
              type="text"
              id="search"
              className="TodoList__input"
              name="query"
              value={query}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="visibletodos">
            Choose todos
            <select
              id="visibleTodos"
              name="visibleTodos"
              value={visibleTodos}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(({ id, userId, completed, title }) => (
              <li
                key={id}
                className={classNames('TodoList__item',
                  {
                    'TodoList__item--unchecked': !completed,
                    'TodoList__item--checked': completed,
                  })}
              >

                <label>
                  <input type="checkbox" checked={completed} readOnly />
                  <p>{title}</p>
                </label>

                <button
                  type="button"
                  className={classNames('TodoList__user-button button',
                    {
                      'TodoList__user-button--selected':
                        userId === selectedUserId,
                    })}
                  onClick={() => selectUser(userId)}
                >
                  {`UserID #${userId}`}
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
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
