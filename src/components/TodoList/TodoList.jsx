import React from 'react';
import './TodoList.scss';
import PropsType from 'prop-types';
import classNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    query: '',
    selected: 'All',
  }

  findTask = (event) => {
    this.setState({ query: event.target.value });
  }

  selectFilter = (event) => {
    this.setState({ selected: event.target.value });
  }

  render() {
    const { todos, selectUser, changeTodoStatus } = this.props;
    const { query, selected } = this.state;
    const filteredTodos = todos
      .filter((todo) => {
        if (selected === 'Active') {
          return todo.completed === false;
        }

        if (selected === 'Completed') {
          return todo.completed === true;
        }

        return todo;
      })
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            placeholder="Task"
            value={query}
            onChange={this.findTask}
          />
          <select
            value={selected}
            onChange={this.selectFilter}
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                className={classNames({
                  TodoList__item: true,
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                    onChange={() => changeTodoStatus(todo)}
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

TodoList.propTypes = {
  todos: PropsType.shape().isRequired,
  selectUser: PropsType.number.isRequired,
  changeTodoStatus: PropsType.func.isRequired,
};
