import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.scss';

const classNames = require('classnames');

export class TodoList extends React.Component {
  state = {
    searchValue: '',
    selectorValue: 'all',
  }

  handleChange = (e) => {
    const { todosVisible, filtered } = this.props;
    const { selectorValue } = this.state;
    const elementTodo = todosVisible.find(todo => todo.id === +e.target.id);

    elementTodo.completed = !elementTodo.completed;
    filtered(selectorValue);
  }

  render() {
    const { todosVisible, selectUser, search, filtered, shuffle } = this.props;
    const { searchValue } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          placeholder="Search by title"
          value={searchValue}
          onChange={(e) => {
            this.setState({ searchValue: e.target.value });
            search(e.target.value);
          }}
        />
        <select
          onChange={(e) => {
            this.setState({ selectorValue: e.target.value });
            filtered(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button
          type="button"
          onClick={shuffle}
        >
          Random it!
        </button>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosVisible.map(todo => (
              <li
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
                key={todo.id}
              >
                <label>
                  <input
                    id={todo.id}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={this.handleChange}
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  name={todo.userId}
                  className="
               TodoList__user-button
               TodoList__user-button--selected
               button
             "
                  type="button"
                  onClick={(e) => {
                    selectUser(e.target.name);
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
  todosVisible: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  search: PropTypes.func.isRequired,
  filtered: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  shuffle: PropTypes.func.isRequired,
};
