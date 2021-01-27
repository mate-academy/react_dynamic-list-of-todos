import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    status: 'all',
  }

  toSearch = e => this.setState({ query: e.target.value })

  toSelect = e => this.setState({ status: e.target.value });

  render() {
    const { todos, selectUser, toShuffle } = this.props;
    const { query, status } = this.state;

    const todoSearch = (todo) => {
      const queryLow = query.toLowerCase();

      return todo.title.toLowerCase().includes(queryLow);
    };

    const statusSearch = (todo) => {
      switch (status) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return todo;
      }
    };

    const newTodos = todos.filter(todoSearch).filter(statusSearch);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__filters">
          <label className="TodoList__label">
            Todo filter:
            <input
              onChange={this.toSearch}
              className="TodoList__input"
            />
          </label>

          <label className="TodoList__label">
            Filter by status:
            <select
              className="TodoList__select"
              onChange={this.toSelect}
            >
              <option value="all">Show all</option>
              <option value="active">Show active</option>
              <option value="completed">Show completed</option>
            </select>
          </label>

          <button
            type="button"
            className="button"
            onClick={toShuffle}
          >
            shuffle
          </button>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {newTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed })}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('button',
                    { 'TodoList__user-button': todo.completed },
                    { 'TodoList__user-button--selected': !todo.completed })}
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
  selectUser: PropTypes.func.isRequired,
  toShuffle: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
