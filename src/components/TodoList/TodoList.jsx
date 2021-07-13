/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';

export class TodoList extends React.Component {
  state = {
    searchLine: '',
    completionFilter: 'all',
    randomOrder: false,
  }

  handleChange = (key, value) => this.setState({ [key]: value });

  render() {
    const { searchLine, completionFilter, randomOrder } = this.state;
    const { selectUser, initialTodos } = this.props;

    let todos = [...initialTodos];

    // filtering by searchline
    todos = todos.filter((todo) => {
      if (todo.title === null) {
        return false;
      }

      return todo.title.toLowerCase().includes(searchLine.toLowerCase());
    });

    // filtering by completion of todos
    if (completionFilter !== 'all') {
      todos = todos.filter((todo) => {
        return completionFilter === 'active'
          ? todo.completed
          : !todo.completed;
      });
    }

    // random order of todos
    if (randomOrder) {
      for (let i = todos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [todos[i], todos[j]] = [todos[j], todos[i]];
      }
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <form className="form">
            <label className="form-element">
              Search by title:
              {' '}
              <input
                name="searchLine"
                value={searchLine}
                onChange={e => this.handleChange(e.target.name, e.target.value)}
              />
            </label>
            <label className="form-element">
              Filter by completion:
              {' '}
              <select
                name="completionFilter"
                value={completionFilter}
                onChange={e => this.handleChange(e.target.name, e.target.value)}
              >
                <option value="all">all</option>
                <option value="active">active</option>
                <option value="completed">completed</option>
              </select>
            </label>
            <button
              className="randomOrderBtn"
              type="button"
              name="randomOrder"
              onClick={e => this.handleChange(e.target.name, !randomOrder)}
            >
              Random Order
            </button>
          </form>
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                className={cn('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  value={todo.userId}
                  onClick={e => selectUser(+(e.target.value))}
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
  initialTodos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  selectUser: PropTypes.func.isRequired,
};
