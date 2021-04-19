import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import propTypes from 'prop-types';
import { todoShape } from '../../shapes/shapes';

export class TodoList extends React.Component {
  state = {
    select: '',
    input: '',
  }

  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  titleChecker = todo => (todo.title === null
    ? todo.title
    : todo.title.includes(
      this.state.input,
    ))

  handleSelect = (todo) => {
    if (this.state.select === 'completed') {
      return todo.completed;
    }

    if (this.state.select === 'active') {
      return !todo.completed;
    }

    return todo;
  }

  render() {
    const { todos, selectUser, changeStatus } = this.props;
    const { input, select } = this.state;
    const filteredTodos = todos
      .filter(this.titleChecker)
      .filter(this.handleSelect);

    return (
      <div className="TodoList">
        <input
          type="text"
          name="input"
          value={input}
          onChange={this.handleChange}
        />
        <select
          value={select}
          name="select"
          onChange={this.handleChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
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
                    checked={todo.completed}
                    onClick={() => changeStatus(todo.id)}
                    readOnly
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
  todos: propTypes.arrayOf(
    propTypes.shape(todoShape),
  ).isRequired,
  selectUser: propTypes.func.isRequired,
  changeStatus: propTypes.func.isRequired,
};
