import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    status: '',
  }

  render() {
    const { query, status } = this.state;
    const { todos, selectUser } = this.props;
    let filteredTodos = todos;

    if (query) {
      filteredTodos = todos.filter(todo => (
        todo.title.toLowerCase().includes(query.toLowerCase())
      ));
    }

    let filteredByStatus = filteredTodos;

    if (status === 'active') {
      filteredByStatus = filteredTodos.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      filteredByStatus = todos.filter(todo => todo.completed);
    }

    return (
      <>
        <h2>Todos</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
        }}
        >
          <input
            name="filterTodos"
            type="text"
            value={query}
            className="queryTitle"
            placeholder="filter by title"
            onChange={event => (
              this.setState({
                query: event.target.value.trimLeft(),
              })
            )}
            required
          />
          <select
            name="select"
            value={status}
            onChange={event => (
              this.setState({
                status: event.target.value,
              })
            )}
          >
            <option value="All">
              Show all
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
              Completed
            </option>
          </select>
          {filteredByStatus.map(todo => (
            <li
              key={todo.id}
              className={`TodoList__item ${todo.completed === false
                ? 'TodoList__item--unchecked'
                : 'TodoList__item--checked'}`
              }
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
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
                value={todo.userId}
                onClick={() => selectUser(todo.userId)}
              >
                User&nbsp;
                {todo.userId}
              </button>
            </li>
          ))}
        </form>
      </>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
};
