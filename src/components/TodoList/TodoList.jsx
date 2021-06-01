import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    filter: '',
    status: '',
  }

  hangleFilter = (event) => {
    this.setState({ filter: event.target.value });
  }

  handleExecutionStatus = (event) => {
    this.setState({ status: event.target.value });
  }

  render() {
    const { updateUser, todos } = this.props;
    const { filter, status } = this.state;
    const searchPhrase = filter.toLocaleLowerCase();
    const statusOptions = ['all', 'active', 'completed'];

    let filteredTodos = todos.filter(({ title }) => (
      title?.toLocaleLowerCase().includes(searchPhrase)
    ));

    if (status) {
      switch (status) {
        case 'active':
          filteredTodos = todos.filter(todo => todo.completed !== true);
          break;
        case 'completed':
          filteredTodos = todos.filter(todo => todo.completed === true);
          break;
        default:
          filteredTodos = todos;
          break;
      }
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div>
          <input
            type="text"
            id="filter"
            className="filter-field"
            name="filter"
            placeholder="filter by title"
            value={filter}
            onChange={this.hangleFilter}
          />
        </div>
        <div>
          <select
            id="status"
            className="filter-field"
            value={status}
            onChange={this.handleExecutionStatus}
          >
            <option>select status for todos</option>
            {statusOptions.map(item => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classnames({
                  TodoList__item: true,
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    defaultChecked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classnames({
                    button: true,
                    'TodoList__user-button': true,
                    'TodoList__user-button--selected': !todo.completed,
                  })}
                  type="button"
                  onClick={() => {
                    if (todo.userId) {
                      updateUser(todo.userId);
                    }
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })),
  updateUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
