import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

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
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, selectUser } = this.props;
    const { input, select } = this.state;
    const newTodos = todos.filter(todo => todo.title.includes(input)
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
            {newTodos.map(todo => (
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

                <button
                  className="
                    TodoList__user-button
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
};
