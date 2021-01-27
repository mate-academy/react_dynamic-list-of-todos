import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import './TodoList.scss';

export class TodoList extends Component {
  state = {
    postId: 0,
    filterStatus: 'all',
    filterTitle: '',
  };

  buttonClickHandler = (postId, userId) => {
    this.setState({ postId });

    this.props.onSelectUser(userId);
  }

  setFilter = (event) => {
    this.setState({ filterStatus: event.target.value });
  }

  onInputHandler = (event) => {
    this.setState({ filterTitle: event.target.value });
  }

  filterByStatus = (todo) => {
    const { filterStatus } = this.state;

    switch (filterStatus) {
      case 'completed': return todo.completed;
      case 'active': return !todo.completed;
      default: return true;
    }
  }

  // eslint-disable-next-line consistent-return
  filterByTitle = (todo) => {
    const { filterTitle } = this.state;

    if (todo.title !== null) {
      return todo.title.toLowerCase().includes(filterTitle.toLowerCase());
    }
  }

  render() {
    const { todos } = this.props;
    const { postId } = this.state;

    const filteredTodos = todos
      .filter(this.filterByStatus)
      .filter(this.filterByTitle);

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
                onChange={event => this.setFilter(event)}
              >
                <option value="all">Show all</option>
                <option value="active">Show active</option>
                <option value="completed">Show completed</option>
              </select>
            </label>
          </form>
          <ul className="TodoList__list">

            {filteredTodos.map(todo => (
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
