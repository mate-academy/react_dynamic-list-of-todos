import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    filterTitle: '',
    sortTodos: 'all',
  }

  sortTodos = (todos) => {
    switch (this.state.sortTodos) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  checkTitle = (title, titleFilter) => title && title.includes(titleFilter);

  render() {
    const {
      todos,
      onSelectedUserId,
      onUserSelected,
    } = this.props;

    const {
      filterTitle,
      sortTodos,
    } = this.state;

    const visibleTodos = this.sortTodos([...todos]);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          value={filterTitle}
          onChange={(event) => {
            this.setState({ filterTitle: event.target.value });
          }}
        />

        <select
          name="sortTodos"
          value={sortTodos}
          onChange={(event) => {
            this.setState({ sortTodos: event.target.value });
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              this.checkTitle(todo.title, filterTitle) ? (
                <li
                  key={todo.id}
                  className={classNames({
                    TodoList__item: true,
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  })}
                >

                  <label>
                    <input type="checkbox" checked={todo.completed} readOnly />
                    <p>{todo.title}</p>
                  </label>

                  {todo.userId && (
                  <button
                    className={classNames({
                      'TodoList__user-button': true,
                      button: true,
                      'TodoList__user-button--selected':
                        onSelectedUserId === todo.userId,
                    })}
                    type="button"
                    onClick={() => {
                      onUserSelected(todo.userId);
                    }}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                  )}
                </li>
              ) : ''
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
      completed: PropTypes.bool,
      userId: PropTypes.number,
    }),
  ),
  onSelectedUserId: PropTypes.number,
  onUserSelected: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
  onSelectedUserId: 0,
};
