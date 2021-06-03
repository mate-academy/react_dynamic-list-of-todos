import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    filterTodosBy: '',
  }

  render() {
    const { todos, selectUserId, selectedUserId } = this.props;
    const { query, filterTodosBy } = this.state;

    // eslint-disable-next-line
    let preparedTodos = todos.filter((todo) => {
      switch (filterTodosBy) {
        case 'active':
          return todo.completed === false;
        case 'completed':
          return todo.completed === true;
        default:
          return todo;
      }
    });

    // eslint-disable-next-line
    preparedTodos = preparedTodos.filter((todo) => {
      if (todo.title !== null) {
        return todo.title.toLowerCase().includes(query.toLocaleLowerCase());
      }
    });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <label>
          <input
            type="text"
            name="title"
            value={query}
            placeholder="todo"
            onChange={(event) => {
              this.setState({ query: event.target.value });
            }}
          />
        </label>
        <select onChange={(event) => {
          this.setState({ filterTodosBy: event.target.value });
        }}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {preparedTodos.map(todo => (
              <li
                className={`TodoList__item ${todo.completed
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked'}`}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={`TodoList__user-button button
                    ${selectedUserId === todo.userId
                    ? 'TodoList__user-button--selected'
                    : ''}`}
                  type="button"
                  onClick={() => {
                    selectUserId(todo.userId);
                  }}
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
    PropTypes.shape({}).isRequired,
  ).isRequired,
  selectUserId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
