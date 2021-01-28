/* eslint-disable consistent-return */
import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    filterTitle: '',
    filterStatus: 'all',
  }

  filterByTitle = (todo) => {
    const { filterTitle } = this.state;

    if (todo.title === null) {
      return;
    }

    return todo.title.toLowerCase()
      .includes(filterTitle.toLowerCase());
  }

  filterByStatus = (todo) => {
    const { filterStatus } = this.state;

    switch (filterStatus) {
      case 'completed': return todo.completed;
      case 'active': return !todo.completed;
      default: return true;
    }
  }

  render() {
    const { todos, onUserSelect } = this.props;

    const filterTodos = todos
      .filter(this.filterByTitle)
      .filter(this.filterByStatus);

    return (

      <div className="TodoList">
        <h2>Todos:</h2>
        <form>
          <label>
            Todo Filter:
            <input
              type="text"
              className="TodoList__filter"
              name="filterTitle"
              value={this.state.name}
              onChange={event => this.setState({
                filterTitle: event.target.value,
              })}
            />
          </label>
          <label>
            <select
              onChange={event => this.setState({
                filterStatus: event.target.value,
              })}
            >
              <option value="all">Show All</option>
              <option value="completed">Show Completed</option>
              <option value="active">Show Active</option>
            </select>
          </label>
        </form>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filterTodos.map(item => (
              <li
                key={item.id}
                className={classNames(`TodoList__item`, {
                  'TodoList__item--unchecked': item.completed === false,
                  'TodoList__item--checked': item.completed === true,
                })}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{item.title}</p>
                </label>

                <button
                  className="
                TodoList__user-button
                TodoList__user-button--selected
                button"
                  onClick={() => {
                    onUserSelect(item.userId);
                  }}
                  type="button"
                >
                  User&nbsp;#
                  {item.userId}
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
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUserSelect: PropTypes.func.isRequired,
};
