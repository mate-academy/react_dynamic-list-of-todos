import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { SearchInput } from '../SearchInput/SearchInput';

export class TodoList extends React.Component {
  state = {
    filterQuery: '',
    status: 'all',
  }

  filterBySelect = {
    all: todo => todo,
    completed: todo => todo.completed,
    active: todo => !todo.completed,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, selectedUser, selectedUserId } = this.props;
    const { filterQuery, status } = this.state;

    const filterTodos = todos
      .filter(todo => todo.title
        .toLowerCase()
        .includes(filterQuery.toLowerCase())
        && this.filterBySelect[status](todo));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <SearchInput
          status={status}
          filterQuery={filterQuery}
          handleChange={this.handleChange}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filterTodos.map(({ id, userId, completed, title }) => (
              <li
                className={classNames('TodoList__item',
                  {
                    'TodoList__item--unchecked': !completed,
                    'TodoList__item--checked': completed,
                  })}
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
                  className={classNames('button TodoList__user-button', {
                    // eslint-disable-next-line max-len
                    'TodoList__user-button--selected': selectedUserId === userId,
                  })}
                  type="button"
                  onClick={() => selectedUser(userId, id)}
                >
                  {`UserId #${userId}`}
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
  selectedUserId: PropTypes.number.isRequired,
  selectedUser: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
