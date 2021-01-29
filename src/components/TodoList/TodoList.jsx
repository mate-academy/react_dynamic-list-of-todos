import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    todo: '',
    criterion: '',
    selectedTodo: 0,
  };

  handleInput = (event) => {
    this.setState({ todo: event.target.value });
  };

  handleSelect = (event) => {
    this.setState({ criterion: event.target.value });
  };

  selectUser = (userId, todoId) => {
    this.setState({ selectedTodo: todoId });
    this.props.selectUser(userId);
  };

  render() {
    const { todos, listHasLoaded } = this.props;
    const { todo, criterion, selectedTodo } = this.state;

    const preparedTodos = todos
      .filter((item) => {
        switch (criterion) {
          case 'active':
            return !item.completed;
          case 'completed':
            return item.completed;
          default:
            return true;
        }
      })
      .filter((item) => {
        if (item.title === null) {
          return;
        }

        return item.title.toLowerCase().includes(todo.toLowerCase());
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__form">
          <input
            type="text"
            className="TodoList__input"
            name="todo"
            value={todo}
            placeholder="Enter a todo"
            onChange={this.handleInput}
          />
          <select
            name="criterion"
            value={criterion}
            onChange={this.handleSelect}
            className="TodoList__select"
          >
            <option value="all">All Todos</option>
            <option value="active">Active todos</option>
            <option value="completed">Completed todos</option>
          </select>
        </div>
        <div className="TodoList__list-container">
          {listHasLoaded ? (
            <ul className="TodoList__list">
              {preparedTodos.map(item => (
                <li
                  className={classNames('TodoList__item', {
                    'TodoList__item--unchecked': !item.completed,
                    'TodoList__item--checked': item.completed,
                  })}
                  key={item.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      readOnly
                    />
                    <p>{item.title}</p>
                  </label>
                  <button
                    type="button"
                    onClick={() => this.selectUser(item.userId, item.id)}
                    className={classNames('button', 'TodoList__user-button', {
                      'TodoList__user-button--selected': item.id === selectedTodo,
                    })}
                  >
                    {`User #${item.userId}`}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>The todos are loading...</p>
          )}
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })).isRequired,
  listHasLoaded: PropTypes.bool.isRequired,
  selectUser: PropTypes.func.isRequired,
};
