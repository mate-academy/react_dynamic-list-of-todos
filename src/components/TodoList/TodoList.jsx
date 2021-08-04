import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    todoFilterInput: '',
    filterBy: 'all',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      todos,
      handleUserIdSelection,
      selectedUserId,
    } = this.props;

    const { todoFilterInput, filterBy } = this.state;

    const filteredTodos = todos
      .filter(todo => todo.title.includes(todoFilterInput))
      .filter((todo) => {
        switch (filterBy) {
          case 'all':
            return todo;

          case 'completed':
            return todo.completed;

          case 'active':
            return !todo.completed;

          default:
            return todo;
        }
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          name="todoFilterInput"
          value={todoFilterInput}
          onChange={this.handleChange}
          placeholder="Search by title"
        />
        <select name="filterBy" onChange={this.handleChange}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={cn({
                  TodoList__item: true,
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })
                }
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
                  type="button"
                  className={cn({
                    button: true,
                    'TodoList__user-button': true,
                    'TodoList__user-button--selected':
                      selectedUserId === todo.userId,
                  })
                  }
                  onClick={() => handleUserIdSelection(todo.userId)}
                >
                  User&nbsp;#
                      {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  handleUserIdSelection: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};

// TodoList.defaultProps = {
//   userId: 0,
//   title: 'No title',
//   completed: false,
// };
