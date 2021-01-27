import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

const classNames = require('classnames');

export class TodoList extends React.Component {
  state = {
    search: '',
    sortBy: 'all',
  }

  handleChangeInput = ({ target }) => {
    const { value } = target;

    this.setState({ search: value });
  }

  // eslint-disable-next-line consistent-return
  toSearch = (todo) => {
    const { search } = this.state;

    if (todo.title !== null) {
      return todo.title.toLowerCase().includes(search.toLowerCase());
    }
  }

  handleChangeSelect = ({ target }) => {
    const { value } = target;

    this.setState({ sortBy: value });
  }

  filterTodosByStatus = (todo) => {
    const { sortBy } = this.state;

    switch (sortBy) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  }

  render() {
    const { todos, onSelect, onChange } = this.props;
    const { search } = this.state;

    const filteredTodos = todos.filter(this.toSearch)
      .filter(this.filterTodosByStatus);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          value={search}
          onChange={this.handleChangeInput}
        />
        <select onChange={this.handleChangeSelect}>
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onChange(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
                  onClick={() => onSelect(todo.userId)}
                  type="button"
                >
                  {`User ${todo.userId}`}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
