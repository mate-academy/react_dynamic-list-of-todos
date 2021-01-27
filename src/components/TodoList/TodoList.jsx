import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    selectedStatus: 'all',
  };

  statusFilter = (todo) => {
    switch (this.state.selectedStatus) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  }

  render() {
    const { query } = this.state;
    const { todos, selectUser, checkHandler } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          className="TodoList__filter"
          value={query}
          placeholder="Filter todos"
          onChange={({ target }) => {
            this.setState({ query: target.value });
          }}
        />
        <select
          className="TodoList__select"
          onChange={({ target }) => {
            this.setState({ selectedStatus: target.value });
          }}
        >
          <option value="all"> all </option>
          <option value="active"> active </option>
          <option value="completed"> completed </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos
              .filter(todo => this.statusFilter(todo))
              .filter(todo => todo.title
                && todo.title.toLowerCase().includes(query.toLowerCase()))
              .map(todo => (
                <li
                  key={todo.id}
                  className={`TodoList__item ${todo.completed
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked'}`}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => checkHandler(todo.id)}
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                    type="button"
                    onClick={() => selectUser(todo.userId)}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  checkHandler: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
};
