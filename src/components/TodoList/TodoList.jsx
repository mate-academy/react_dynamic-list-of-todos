import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    query: '',
    selectedTodos: '',
  }

  filterTodos = (todos, select) => {
    const query = this.state.query.toLowerCase();
    const filteredTodos = todos.filter(
      todo => todo.title.toLowerCase().includes(query),
    );

    if (select === 'active') {
      return filteredTodos.filter(todo => !todo.completed);
    }

    if (select === 'completed') {
      return filteredTodos.filter(todo => todo.completed);
    }

    return filteredTodos;
  }

  render() {
    const { todos, getUserId, toggleChange } = this.props;
    const { selectedTodos } = this.state;
    const filteredTodos = this.filterTodos(todos, selectedTodos);

    return (
      <div className="TodoList">
        <input
          className="TodoList__search"
          type="text"
          placeholder="Search todo by title"
          onChange={event => (
            this.setState({ query: event.target.value })
          )}
        />
        <select
          className="TodoList__select"
          value={selectedTodos}
          onChange={event => (
            this.setState({ selectedTodos: event.target.value })
          )}
        >
          <option value="">Select todos</option>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <ul className="TodoList__list">
          {filteredTodos.map(({ id, title, completed, userId }) => (
            <li
              key={id}
              className={ClassNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !completed,
                  'TodoList__item--checked': completed,
                },
              )}
            >
              <label>
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => toggleChange(id)}
                />
                <p>{title}</p>
              </label>

              <button
                type="button"
                className="TodoList__user-button
                  TodoList__user-button--selected
                  button"
                onClick={() => getUserId(userId)}
              >
                {`User# ${userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  getUserId: PropTypes.func.isRequired,
  toggleChange: PropTypes.func.isRequired,
};
