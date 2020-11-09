import React from 'react';
import './TodoList.scss';
import propTypes from 'prop-types';
import classNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    input: '',
    select: 'All',
  }

  filter = {
    All: () => true,
    Completed: todo => todo.completed,
    Active: todo => !todo.completed,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { todos, selectUser, selectedUserId, selectedTodoId } = this.props;
    const { input, select } = this.state;
    const filteredTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(input.toLowerCase())
    )
    && this.filter[select](todo));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            type="text"
            name="input"
            value={input}
            className="TodoList__input"
            onChange={this.handleChange}
          />

          <select
            name="select"
            value={select}
            className="TodoList__input"
            onChange={this.handleChange}
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>

          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                className={
                  `TodoList__item ${todo.completed
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked'}`
                }
                key={todo.id}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>
                    {todo.title}
                  </p>
                </label>

                {selectedTodoId === todo.id && selectedUserId === todo.userId
                  ? (
                    <button
                      className={
                        classNames('TodoList__user-button button', {
                          'TodoList__user-button--selected':
                          todo.userId === selectedUserId
                          && selectedTodoId === todo.id,
                        })
                      }
                      type="button"
                      onClick={() => selectUser(0, 0)}
                    >
                      User&nbsp;#
                      {todo.userId}
                    </button>
                  ) : (
                    <button
                      className={
                        classNames('TodoList__user-button button', {
                          'TodoList__user-button--selected':
                          todo.userId === selectedUserId
                          && selectedTodoId === todo.id,
                        })
                      }
                      type="button"
                      onClick={() => selectUser(todo.userId, todo.id)}
                    >
                      User&nbsp;#
                      {todo.userId}
                    </button>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    userId: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  })).isRequired,
  selectUser: propTypes.func.isRequired,
  selectedUserId: propTypes.number.isRequired,
  selectedTodoId: propTypes.number.isRequired,
};
