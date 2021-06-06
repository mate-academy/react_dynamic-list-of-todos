import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    titleFilter: '',
    statusFilter: 'all',
  };

  handleFilter = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }


  render() {
    const { selectedUserId, selectUser } = this.props;
    const { titleFilter, statusFilter } = this.state;
    let todos = this.props.todos;

    todos = todos.filter(({ title }) => (
      title && title.includes(titleFilter.trim())
    ));

    switch (statusFilter) {
      case 'active':
        todos = todos.filter(({ completed }) => !completed);
        break;
      case 'completed':
        todos = todos.filter(({ completed }) => completed);
        break;
      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__options">
          <input
            type="text"
            className="TodoList__filter-title"
            placeholder="Filter todos by title"
            name="titleFilter"
            value={titleFilter}
            onChange={this.handleFilter}
          />
          <select
            name="statusFilter"
            className="TodoList__filter-status"
            onChange={this.handleFilter}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(({ id, userId, title, completed }) => (
              <li
                className={classNames(
                  'TodoList__item', completed
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked',
                )}
                key={id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={completed}
                    readOnly
                  />
                  <p>{title}</p>
                </label>

                <button
                  type="button"
                  className={classNames(
                    'button TodoList__user-button',
                    selectedUserId === userId
                    && 'TodoList__user-button--selected',
                  )}
                  onClick={() => selectUser(userId)}
                >
                  User&nbsp;
                  {userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const todosTypes = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
}));

TodoList.propTypes = {
  todos: todosTypes,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
