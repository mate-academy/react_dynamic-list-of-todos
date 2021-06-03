import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    selectedTodos: 'all',
  }

  handleQueryChange = (event) => {
    this.setState({ query: event.target.value.toLowerCase() });
  }

  handleSelectedChange = (event) => {
    this.setState({ selectedTodos: event.target.value });
  }

  todosSelector = (todos) => {
    const { selectedTodos } = this.state;

    switch (selectedTodos) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  render() {
    const { todos, userSelect, selectedUserId } = this.props;
    const { query } = this.state;

    const workingTodos = this.todosSelector([...todos]);

    // eslint-disable-next-line array-callback-return,consistent-return
    const visibleTodos = workingTodos.filter(({ title }) => {
      if (title) {
        return title.toLowerCase().includes(query);
      }
    });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        {'Search: '}
        <input
          type="text"
          placeholder="Enter a title"
          onChange={this.handleQueryChange}
        />

        <select
          onChange={this.handleSelectedChange}
        >
          <option>Choose todos</option>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(({ id, title, userId, completed }) => (
              <li
                key={id}
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': completed,
                  'TodoList__item--unchecked': !completed,
                })}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={completed}
                    readOnly
                  />
                  <p>{title}</p>
                </label>

                <button
                  onClick={() => {
                    userSelect(userId);
                  }}
                  className={classNames('TodoList__user-button button', {
                    'TodoList__user-button--selected':
                      selectedUserId === userId,
                  })}
                  type="button"
                >
                  {`User #${+userId}`}
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
    PropTypes.shape({}),
  ).isRequired,

  userSelect: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
