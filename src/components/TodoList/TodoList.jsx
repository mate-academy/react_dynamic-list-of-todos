import React from 'react';
import './TodoList.scss';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    filterBy: 'all',
  }

  handleFilterChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, selectUser, selectedUserId } = this.props;
    const { query, filterBy } = this.state;
    const preFilteredBySelect = todos
      .filter((todo) => {
        switch (filterBy) {
          case 'all':
            return todo;

          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          default:
            return todo;
        }
      });
    const filteredTodos = preFilteredBySelect
      .filter(todo => todo.title.includes(query));

    return (
      <div className="TodoList">
        <h2>
          {`Todos. Total: ${todos.length}. Filtered: ${filteredTodos.length}`}
        </h2>
        <input
          name="query"
          value={query}
          onChange={this.handleFilterChange}
        />

        <select
          name="filterBy"
          onChange={this.handleFilterChange}
        >
          <option value="all">
            All
          </option>
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                className={ClassNames({
                  TodoList__item: true,
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
                key={todo.id}
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
                  className={ClassNames({
                    button: true,
                    'TodoList__user-button': true,
                    'TodoList__user-button--selected':
                    todo.userId === selectedUserId,
                  })}
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
    userId: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })),
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
