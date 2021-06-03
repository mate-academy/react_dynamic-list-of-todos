import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    completedTodos: 'All',
    title: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, onSelectedUser } = this.props;
    const { title, completedTodos } = this.state;
    let preparedTodoList;

    switch (completedTodos) {
      case 'All':
        preparedTodoList = todos;
        break;
      case 'Completed':
        preparedTodoList = todos.filter(todo => todo.completed === true);
        break;
      case 'Active':
        preparedTodoList = todos.filter(todo => todo.completed === false);
        break;
      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          name="title"
          placeholder="Enter todo title"
          value={title}
          onChange={this.handleChange}
        />

        <select
          name="completedTodos"
          value={completedTodos}
          onChange={this.handleChange}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Active</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {preparedTodoList
              .filter(todo => todo.title
                && (todo.title).includes(title))
              .map(todo => (
                <li
                  key={todo.id}
                  className={classNames('TodoList__item', {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  })
                }
                >
                  <label>
                    {todo.completed ? (
                      <input type="checkbox" checked readOnly />
                    ) : (
                      <input type="checkbox" disabled />
                    )}

                    <p>{todo.title}</p>
                  </label>
                  <button
                    className={classNames('button TodoList__user-button', {
                      // eslint-disable-next-line
                      'TodoList__user-button--selected': todo.userId === this.props.selectedUserId,
                    })}
                    type="button"
                    onClick={() => {
                      onSelectedUser(todo.userId);
                    }}
                  >
                    User #
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
  })).isRequired,
  onSelectedUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
