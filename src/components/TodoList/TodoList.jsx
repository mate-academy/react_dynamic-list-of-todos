import React from 'react';
import './TodoList.scss';
import propTypes from 'prop-types';

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
    const { todos, selectUser, selectedUserId } = this.props;
    const { input, select } = this.state;
    const filteredTodos = todos.filter(todo => todo.title.includes(input)
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

                {selectedUserId === todo.userId ? (
                  <button
                    className="button"
                    type="button"
                    onClick={() => selectUser(0)}
                  >
                    User&nbsp;#
                    {todo.id}
                  </button>
                ) : (
                  <button
                    className="button"
                    type="button"
                    onClick={() => selectUser(todo.userId)}
                  >
                    User&nbsp;#
                    {todo.id}
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
};
