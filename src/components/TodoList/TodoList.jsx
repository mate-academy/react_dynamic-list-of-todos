import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.PureComponent {
  state = {
    todos: this.props.todos,
    searchQuery: '',
    completedFilter: 'all',
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  getVisibleTodos = (todos, searchQuery) => {
    const normalizedQuery = searchQuery.toLowerCase();

    return todos.filter(todo => todo.title
      && todo.title.toLowerCase().includes(normalizedQuery));
  }

  filterCompletedTodos = (todos, completedFilter) => todos.filter(todo => (
    completedFilter === 'completed'
      ? todo.completed
      : !todo.completed
  ))

  render() {
    const { selectedUserId, onSelectUser } = this.props;
    const { todos, searchQuery, completedFilter } = this.state;

    let visibleTodos = this.getVisibleTodos(todos, searchQuery);

    if (completedFilter !== 'all') {
      visibleTodos = this.filterCompletedTodos(visibleTodos, completedFilter);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div>
          <input
            value={searchQuery}
            name="searchQuery"
            onChange={this.handleChange}
            type="text"
            placeholder="Type something for filtering todos"
          />

          <select
            name="completedFilter"
            value={completedFilter}
            onChange={this.handleChange}
          >
            <option name="all">all</option>
            <option name="active">active</option>
            <option name="completed">completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                    {
                      'TodoList__user-button--selected': todo.userId
                        === selectedUserId,
                    },
                  )}
                  type="button"
                  onClick={() => onSelectUser(todo.userId)}
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
      userId: PropTypes.number,
    }),
  ),
  selectedUserId: PropTypes.number.isRequired,
  onSelectUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
