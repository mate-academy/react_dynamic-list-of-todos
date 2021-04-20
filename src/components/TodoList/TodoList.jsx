import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TodoType } from '../../types';
import { ControlPanel } from '../ControlPanel';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    searchText: '',
    status: 'all',
  }

  updateTodos = (key, value) => {
    this.setState({
      [key]: value,
    });
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
        <ControlPanel
          updateTodos={this.updateTodos}
          searchText={searchText}
          status={status}
        />
        <ul>
          {this.createTodos()}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
  selectedId: PropTypes.number.isRequired,
  selectionChanged: PropTypes.func.isRequired,
  todoCompleted: PropTypes.func.isRequired,
};
