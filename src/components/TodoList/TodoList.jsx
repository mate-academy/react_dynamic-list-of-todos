import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.props.queryUpdate(this.state.query);
    }
  }

  handleQueryChange = (event) => {
    this.setState(
      { query: event.target.value },
    );
  };

  render() {
    const { todos, selectUser, setCompletedStatus } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__filter-form">
          <label fotHtml="bytitle">
            {`Filter by title  `}
            <input
              id="bytitle"
              type="text"
              onChange={this.handleQueryChange}
            />
          </label>
          <label fotHtml="bytitle">
            {`   Filter by completed  `}
            <select
              className="TodoList__filter-completed"
              onChange={event => setCompletedStatus(event.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Active">Active</option>
            </select>
          </label>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                className={classNames(`TodoList__item `,
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed })
                }
              >
                <label>
                  <input type="checkbox" readOnly />
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
                  {`User #${(todo.userId !== null) ? todo.userId : 0}`}

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
  todos: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired,
  }).isRequired,
  selectUser: PropTypes.func.isRequired,
  setCompletedStatus: PropTypes.func.isRequired,
  queryUpdate: PropTypes.func.isRequired,
};
