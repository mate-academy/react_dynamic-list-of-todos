import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    searchText: '',
    status: 'all',
  }

  createTodos() {
    const { selectedId, selectionChanged, todoCompleted } = this.props;
    const filtered = this.filteredTodos();

    return filtered.map(todo => (
      <li
        key={todo.id}
        className={classnames(
          'TodoList__item',
          { 'TodoList__item--checked': todo.completed },
          { 'TodoList__item--unchecked': !todo.completed },
        )}
      >
        <label>
          <input
            type="checkbox"
            checked={todo.completed}
            onClick={() => todoCompleted(todo.id)}
            readOnly
          />
          <p>{todo.title}</p>
        </label>

        <button
          className={classnames(
            'TodoList__user-button',
            { 'TodoList__user-button--selected': todo.userId === selectedId },
            'button',
          )}
          onClick={() => {
            selectionChanged(todo.userId);
          }}
          type="button"
        >
          User&nbsp;#
          {todo.userId}
        </button>
      </li>
    ));
  }

  changeSearch(newSearch) {
    this.setState({
      searchText: newSearch,
    });
  }

  changeStatus(newStatus) {
    this.setState({
      status: newStatus,
    });
  }

  filteredTodos() {
    const { status, searchText } = this.state;
    const { todos: initialTodos } = this.props;

    let newStatusTodos = initialTodos;

    if (status !== 'all') {
      newStatusTodos = newStatusTodos
        .filter(todo => todo.completed === (status === 'completed'));
    }

    if (searchText.length) {
      newStatusTodos = newStatusTodos
        .filter(todo => todo.title && todo.title.includes(searchText));
    }

    return newStatusTodos;
  }

  render() {
    const { searchText, status } = this.state;

    return (
      <div className="TodoList">
        <h2>
          Todos:
        </h2>
        <div className="TodoList__controls">
          <input
            className="TodoList__input"
            type="text"
            value={searchText}
            onChange={e => this.changeSearch(e.target.value)}
          />
          <select
            name="filter"
            id="filter"
            className="TodoList__select"
            value={status}
            onChange={e => this.changeStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <ul>
          {this.createTodos()}
        </ul>
      </div>
    );
  }
}

const TodoType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
  selectedId: PropTypes.string.isRequired,
  selectionChanged: PropTypes.string.isRequired,
  todoCompleted: PropTypes.string.isRequired,
};
