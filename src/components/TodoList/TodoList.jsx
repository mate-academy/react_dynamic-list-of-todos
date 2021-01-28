import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    search: '',
    query: 'all',
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      completed: PropTypes.bool,
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      userId: PropTypes.number,
    })).isRequired,
    selectUser: PropTypes.func.isRequired,
  }

  handleFieldChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  applyFilters = (todos) => {
    let todosToShow = [...todos];
    const { search, query } = this.state;

    if (search) {
      todosToShow = todosToShow.filter(todo => todo.title && todo.title
        .toLowerCase().includes(search.toLowerCase()));
    }

    if (query === 'completed') {
      todosToShow = todosToShow.filter(todo => todo.completed);
    }

    if (query === 'active') {
      todosToShow = todosToShow.filter(todo => !todo.completed);
    }

    return todosToShow;
  }

  render() {
    const { selectUser, todos } = this.props;
    const { search, query } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <form>
            <input
              name="search"
              type="text"
              value={search}
              placeholder="Type search word"
              onChange={this.handleFieldChange}
            />

            <select
              name="query"
              value={query}
              onChange={this.handleFieldChange}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </form>

          <ul className="TodoList__list">
            {this.applyFilters(todos).map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item TodoList__item--${
                  todo.completed ? 'checked' : 'unchecked'}`}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
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
