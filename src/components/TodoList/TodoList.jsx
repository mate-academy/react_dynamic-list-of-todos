import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Form } from '../Form';

export class TodoList extends React.Component {
  state = {
    value: 'all',
    search: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { todos, selectUser, selectedUserId, changeCompleted } = this.props;
    const { value, search } = this.state;
    const selectedTodos = todos.filter(todo => (
      value !== 'all'
        ? todo.completed === Boolean(+value) && todo.title.includes(search)
        : todo.title.includes(search)
    ));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <Form
          value={value}
          search={search}
          handleChange={this.handleChange}
        />
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {selectedTodos.map(todo => (
              <li
                key={todo.id}
                className={`
              TodoList__item
              ${todo.completed === false
                  ? 'TodoList__item--unchecked'
                  : 'TodoList__item--checked'}
              `}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => changeCompleted(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected':
                      todo.userId === selectedUserId },
                  )}
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  changeCompleted: PropTypes.func.isRequired,
};
