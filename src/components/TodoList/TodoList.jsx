import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import './TodoList.scss';

export class TodoList extends Component {
  state = {
    postId: 0,
    filterTitle: '',
    select: 'all',
  };

  buttonClickHandler = (postId, userId) => {
    this.setState({ postId });

    this.props.onSelectUser(userId);
  }

  selectChangeHandler = (event) => {
    this.setState({ select: event.target.value });
  }

  onInputHandler = (event) => {
    this.setState({ filterTitle: event.target.value });
  }

  render() {
    let { todos } = this.props;
    const { postId, filterTitle, select } = this.state;

    if (select !== 'all') {
      select === 'active'
        ? todos = todos.filter(todo => todo.completed === false)
        : todos = todos.filter(todo => todo.completed === true);
    }

    if (filterTitle) {
      todos = todos
        .filter(({ title }) => title !== null
          && title.toLowerCase().includes(filterTitle.toLowerCase()));
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <form>
            <label className="TodoList__label">
              Todo filter:
              <input
                onChange={event => this.onInputHandler(event)}
                className="TodoList__filter"
              />
            </label>

            <label className="TodoList__label">
              Filter by status:
              <select
                className="TodoList__select"
                onChange={event => this.selectChangeHandler(event)}
              >
                <option value="all">Show all</option>
                <option value="active">Show active</option>
                <option value="completed">Show completed</option>
              </select>
            </label>
          </form>
          <ul className="TodoList__list">

            {todos.map(todo => (
              <li
                key={todo.id}
                className={cn('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  onClick={() => this.buttonClickHandler(todo.id, todo.userId)}
                  className={cn('TodoList__user-button', 'button', {
                    'TodoList__user-button--selected': todo.id === postId,
                  })}
                  type="button"
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
  onSelectUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
