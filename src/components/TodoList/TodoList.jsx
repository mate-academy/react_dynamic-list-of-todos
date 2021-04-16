import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    filter: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  filterTodos = (todos) => {
    const { query, filter } = this.state;

    switch(filter) {
      case 'completed':
        return todos.filter(todo =>
          todo.completed && todo.title.includes(query));
      case 'active':
        return todos.filter(todo =>
          !todo.completed && todo.title.includes(query));
      default:
        return todos.filter(todo => todo.title.includes(query));
    }
  }

  render() {
    const { onSelectedUser, todos } = this.props;
    const filteredTodos = this.filterTodos(todos);

    return (
      <div className="TodoList">
        <input
          type="text"
          className="input"
          name="query"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <select
          name="filter"
          className="select"
          value={this.state.filter}
          onChange={this.handleChange}
        >
          <option value="all">
            all
          </option>
          <option value="active">
            active
          </option>
          <option value="completed">
            completed
          </option>
        </select>
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              filteredTodos.map(todo => (
                <li
                  key={todo.id}
                  className={classNames(
                    'TodoList__item',
                    { 'TodoList__item--checked': todo.completed },
                    { 'TodoList__item--unchecked': !todo.completed },
                  )}
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
                    className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                    type="button"
                    onClick={() => onSelectedUser(todo.userId)}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.defaultProps = {
  todos: [],
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
  onSelectedUser: PropTypes.func.isRequired,
};
