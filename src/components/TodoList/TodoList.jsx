import React from 'react';
import PropTypes from 'prop-types';
import { ACTIVE, COMPLETED } from '../../api';
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

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  }

  filterTodos = (todos) => {
    switch (this.state.filter) {
      case ACTIVE:
        return todos.filter(todo => !todo.completed);
      case COMPLETED:
        return todos.filter(todo => todo.completed);
      default: return todos;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const { todos, setSelectedUserId, shuffleTodos } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <form onSubmit={event => this.handleSubmit(event)}>
            <input
              name="query"
              placeholder="todos filter"
              className="todoInput"
              value={this.state.query}
              onChange={this.handleChange}
            />
            <select
              name="filter"
              value={this.state.filter}
              onChange={this.handleChange}
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
                    onClick={() => setSelectedUserId(+todo.userId)}
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
  setSelectedUserId: PropTypes.func.isRequired,
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
