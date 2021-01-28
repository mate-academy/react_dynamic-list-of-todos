import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    filteredBy: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, selectedUser, todoCheck: checkTodo } = this.props;
    const input = this.state.query.toLocaleLowerCase();

    const preparedTodos = todos.filter(todo => todo.title.toLocaleLowerCase()
      .includes(input))
      .filter((todo) => {
        if (this.state.filteredBy === 'true') {
          return todo.completed === true;
        }

        if (this.state.filteredBy === 'false') {
          return todo.completed === false;
        }

        return todo;
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          placeholder="search todo"
          type="text"
          onChange={(event) => {
            this.setState({
              query: event.target.value.toLocaleLowerCase(),
            });
          }}
        />
        <select
          name="filteredBy"
          value={this.state.filteredBy}
          onChange={this.handleChange}
        >

          <option value="all">
            all todos
          </option>

          <option value="false">
            active
          </option>

          <option value="true">
            completed
          </option>

        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {preparedTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(`TodoList__item`, {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label>
                  <input
                    type="checkbox"
                    name="done"
                    checked={todo.completed}
                    onChange={() => checkTodo(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    // eslint-disable-next-line max-len
                    { 'TodoList__user-button--selected': todo.userId === selectedUser },
                  )}
                  type="button"
                  onClick={() => {
                    this.props.selectUser(todo.userId);
                  }}
                >
                  {`User #${todo.userId}`}
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
    completed: PropTypes.bool,
  })).isRequired,
  selectedUser: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  todoCheck: PropTypes.func.isRequired,
};
