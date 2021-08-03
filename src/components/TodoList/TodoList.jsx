import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    searchLine: '',
    filterBy: 'all',
  }

  handleChange = (key, value) => this.setState({ [key]: value });

  searchTodo = event => this.setState({ searchLine: event.target.value });

  filterTodo = (event) => {
    this.handleChange(event.target.name, event.target.value);
  }

  render() {
    const { todos, selectedUserId, onUserIdSelected } = this.props;
    const { searchLine, filterBy } = this.state;
    let filteredTodos = todos.filter((todo) => {
      if (todo.title === null) {
        return false;
      }

      return todo.title.toLowerCase().includes(searchLine.toLowerCase());
    });

    if (filterBy !== 'all') {
      filteredTodos = filteredTodos.filter(todo => (filterBy === 'active'
        ? !todo.completed
        : todo.completed));
    }

    // export const TodoList = ({
    //   todos,
    //   onUserIdSelected,
    //   selectedUserId,
    // }) =>
    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <input
            type="text"
            placeholder="Search by title"
            value={this.state.searchLine}
            onChange={this.searchTodo}
          />
          <select
            name="filterBy"
            value={filterBy}
            onChange={this.filterTodo}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>
                {todo.userId && (
                  <button
                    type="button"
                    className={classNames('button', {
                      'TodoList__user-button': true,
                      'TodoList__user-button--selected':
                        selectedUserId === todo.userId,
                    })}
                    onClick={() => {
                      onUserIdSelected(todo.userId);
                    }}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })).isRequired,
  onUserIdSelected: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
