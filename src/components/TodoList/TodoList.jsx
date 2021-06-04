import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    titleQuery: '',
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.titleQuery !== this.state.titleQuery) {
      this.props.updateSearchTitle(this.state.titleQuery);
    }
  }

  render() {
    const {
      todos,
      selectUser,
      updateSearchTodoStatus,
      selectedUserId,
    } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__filter-form">
          <label fotHtml="bytitle">
            Filter by title
            {`  `}
            <input
              id="bytitle"
              type="text"
              onChange={(event) => {
                this.setState({ titleQuery: event.target.value });
              }}
            />
          </label>
          <label fotHtml="bycompleted">
            Filter by completed
            {`  `}
            <select
              id="bycompleted"
              className="TodoList__filter-completed"
              onChange={event => updateSearchTodoStatus(event.target.value)}
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
                key={todo.id}
                className={classNames(`TodoList__item `,
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed })
                }
              >
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(`TodoList__user-button button`,
                    { 'TodoList__user-button--selected':
                      todo.userId === selectedUserId })}
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
  updateSearchTodoStatus: PropTypes.func.isRequired,
  updateSearchTitle: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
