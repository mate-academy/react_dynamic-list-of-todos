import './TodoList.scss';
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends Component {
  state = {
    todoId: 0,
    filterStatus: 'all',
    filterTitle: '',
  };

  selectedUser = (todoId, userId) => {
    this.setState({ todoId });
    this.props.selectedUser(userId);
  }

  valueFilter = (event) => {
    this.setState({ filterStatus: event.target.value });
  }

  handlerInput = (event) => {
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

  filterByTitle = (todo) => {
    const { filterTitle } = this.state;

    if (todo.title === null) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return todo.title
      .toLowerCase()
      .includes(filterTitle.toLowerCase());
  }

  render() {
    const { todos } = this.props;
    const { todoId } = this.state;

    const filteredTodos = todos
      .filter(this.filterByStatus)
      .filter(this.filterByTitle);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <form>
            <label className="TodoList__label">
              Find todo:
              <input
                onChange={this.handlerInput}
                className="TodoList__filter"
              />
            </label>

            <label className="TodoList__label">
              Status:
              <select
                className="TodoList__select"
                onChange={event => this.valueFilter(event)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </label>
          </form>
          <ul className="TodoList__list">

            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
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
                  onClick={() => this.selectedUser(todo.id, todo.userId)}
                  className={classNames('TodoList__user-button', 'button', {
                    'TodoList__user-button--selected': todo.id === todoId,
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
  selectedUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
