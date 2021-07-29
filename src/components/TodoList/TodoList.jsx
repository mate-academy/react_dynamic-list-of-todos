import React, { Component } from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends Component {
  state = {
    searchLine: '',
    filterBy: 'all',
  }

  handleChange = (key, value) => this.setState({ [key]: value });

  render() {
    const { todos, selectUser } = this.props;
    const { searchLine, filterBy } = this.state;
    let filteredTodos = todos.filter((todo) => {
      if (todo.title === null) {
        return false;
      }

      return todo.title.toLowerCase().includes(searchLine.toLowerCase());
    });

    if (filterBy !== 'all') {
      filteredTodos = filteredTodos.filter(todo => (filterBy === 'active'
        ? !todo.completed
        : todo.completed));
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <input
            type="text"
            placeholder="Search by title"
            value={this.state.searchLine}
            onChange={(event) => {
              this.setState({ searchLine: event.target.value });
            }}
          />
          <select
            name="filterBy"
            value={filterBy}
            onChange={e => this.handleChange(e.target.name, e.target.value)}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                className={`
                  TodoList__item
                  TodoList__item${todo.completed
                  ? '--checked'
                  : '--unchecked'}`
                  }
                key={todo.id}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>
                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button"
                  type="button"
                  value={todo.userId}
                  onClick={e => selectUser(+(e.target.value))}
                >
                  User&nbsp;
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
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
};
