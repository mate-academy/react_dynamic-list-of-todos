import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    filter: 'All',
  };

  isQueryInTodo = (query, title) => {
    if (!this.state.query.length && this.state.showTodos === 'All') {
      return true;
    }

    if (title === null) {
      return false;
    }

    const serchElement = query.toLowerCase().trim();

    return (!!(title.toLowerCase().includes(serchElement)));
  };

  hadnleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  }

  filterTodos = (todos) => {
    switch (this.state.filter) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default: return todos;
    }
  }

  render() {
    const { todos, setUser, shuffleTodos } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <form onSubmit={event => event.preventDefault()}>
            <input
              name="query"
              placeholder="todos filter"
              className="todoInput"
              value={this.state.query}
              onChange={this.hadnleChange}
            />
            <select
              name="filter"
              value={this.state.filter}
              onChange={this.hadnleChange}
              className="todoSelect"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              type="button"
              className="button"
              onClick={() => shuffleTodos(todos)}
            >
              Randomize
            </button>
          </form>
          <ul className="TodoList__list">
            {this.filterTodos(todos).map(todo => (
              this.isQueryInTodo(this.state.query, todo.title) && (
                <li
                  key={todo.id}
                  className={todo.completed
                    ? 'TodoList__item TodoList__item--checked'
                    : 'TodoList__item TodoList__item--unchecked'}
                >
                  <label>
                    <input type="checkbox" readOnly checked={todo.completed} />
                    <p>{todo.title}</p>
                  </label>
                  <button
                    className="
                TodoList__user-button
                TodoList__user-button--selected
                button"
                    type="button"
                    onClick={() => setUser(+todo.userId, 'selectedUserId')}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  setUser: PropTypes.func.isRequired,
  shuffleTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
