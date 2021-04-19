import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    titleQuery: '',
    todosStatus: 'all',
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, handleCheck, selectUser } = this.props;

    const visibleTodos = todos
      .filter((todo) => {
        const { titleQuery, todosStatus } = this.state;
        const lowerQuery = titleQuery.toLowerCase();

        let todoHasSelectedStatus;

        switch (todosStatus) {
          case 'active':
            todoHasSelectedStatus = todo.completed === false;
            break;
          case 'completed':
            todoHasSelectedStatus = todo.completed === true;
            break;
          default:
            todoHasSelectedStatus = true;
        }

        return todo.title.toLowerCase().includes(lowerQuery)
          && todoHasSelectedStatus;
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          name="titleQuery"
          className="TodoList__input"
          value={this.state.titleQuery}
          onChange={(e) => {
            this.handleChange(e);
          }}
          placeholder="Enter title"
        />

        <select
          name="todosStatus"
          value={this.state.todosStatus}
          onChange={(e) => {
            this.handleChange(e);
          }}
        >
          <option value="all">Show all</option>
          <option value="active">Show active</option>
          <option value="completed">Show completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                    onChange={() => {
                      handleCheck(todo.id);
                    }}
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
                  onClick={() => {
                    selectUser(todo.userId);
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      completed: PropTypes.bool,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,

  selectUser: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
};
