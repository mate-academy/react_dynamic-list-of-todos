import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    inputValue: '',
    selectValue: '',
  }

  handleChange = (ev) => {
    const { value, name } = ev.target;

    this.setState({
      [name]: value,
    });
  }

  filterForInput = todo => (
    todo.title === null
      ? todo.title
      : todo.title.includes(this.state.inputValue)
  )

  handleSelect = (todo) => {
    if (this.state.selectValue === 'active') {
      return !todo.completed;
    }

    if (this.state.selectValue === 'completed') {
      return todo.completed;
    }

    return todo;
  }

  render() {
    const { todos, selectUser } = this.props;
    const { inputValue, selectValue } = this.state;
    const filteredTodos = todos
      .filter(this.filterForInput).filter(this.handleSelect);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          className="TodoList__input"
          placeholder="Search"
          type="text"
          name="inputValue"
          value={inputValue}
          onChange={this.handleChange}
        />
        <select
          className="TodoList__select"
          value={selectValue}
          name="selectValue"
          onChange={this.handleChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label>
                  <input type="checkbox" readOnly checked={todo.completed} />
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      completed: PropTypes.bool,
      title: PropTypes.string,
      userId: PropTypes.number,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
};
