import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    filteredTodos: this.props.todos,
    status: '',
    query: '',
  }

  filterTodos = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
    let filtTodos = this.props.todos;

    filtTodos = filtTodos
      .filter(todo => (todo.title.includes(this.state.query.toLowerCase())));
    if (value === 'active') {
      filtTodos = this.props.todos.filter(todo => todo.completed === false);
    }

    if (value === 'completed') {
      filtTodos = this.props.todos.filter(todo => todo.completed === true);
    }

    this.setState({ filteredTodos: filtTodos });
  }

  render() {
    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form>
          <input
            onChange={this.filterTodos}
            value={this.state.query}
            name="query"
          />
          <select
            onChange={this.filterTodos}
            value={this.state.status}
            name="status"
          >
            <option hidden>Choose a status</option>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">

            {this.state.filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item
                  ${todo.completed
                  ? 'TodoList__item--unchecked'
                  : 'TodoList__item--checked'}`}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={`TodoList__user-button button
                    ${todo.completed
                    ? 'TodoList__user-button--selected'
                    : ''}`}
                  type="button"
                  onClick={() => this.props.setUser(todo.userId)}
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
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  setUser: PropTypes.func.isRequired,
};
