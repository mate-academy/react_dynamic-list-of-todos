import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    filterValue: '',
    selectValue: '',
  }

  filterValueChangeHandler = (event) => {
    this.setState({
      filterValue: event.target.value,
    });
  }

  selectValueChangeHandler = (event) => {
    this.setState({
      selectValue: event.target.value,
    });
  }

  render() {
    const { todos, onSelect, selectedUserId } = this.props;
    const { filterValue, selectValue } = this.state;

    const filterTodos = todos.filter(todo => todo.title)
      .filter(todo => (
        todo.title.toLowerCase().includes(filterValue.toLowerCase().trim())));

    let todosToRender = (filterValue)
      ? filterTodos
      : todos;

    if (selectValue === 'active') {
      todosToRender = todosToRender.filter(({ completed }) => !completed);
    }

    if (selectValue === 'completed') {
      todosToRender = todosToRender.filter(({ completed }) => completed);
    }

    return (
      <>
        <div className="TodoList">
          <h2>Todos:</h2>
          <input
            className="TodoList__input"
            type="text"
            value={filterValue}
            name={filterValue}
            onChange={this.filterValueChangeHandler}
          />
          <select
            className="TodoList__select"
            value={selectValue}
            name={selectValue}
            onChange={this.selectValueChangeHandler}
          >
            <option
              value=""
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
              Completed
            </option>
          </select>
          <div className="TodoList__list-container">
            <ul className="TodoList__list">
              {todosToRender.map(todo => (
                <li
                  key={todo.id}
                  className={classNames(
                    'TodoList__item',
                    {
                      'TodoList__item--checked': todo.completed,
                      'TodoList__item--unchecked': !todo.completed,
                    },
                  )}
                >
                  <label>
                    <input
                      type="checkbox"
                      readOnly
                      checked={todo.completed}
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    onClick={() => {
                      onSelect(todo.userId);
                    }}
                    className={classNames(
                      'button', 'TodoList__user-button',
                      {
                        'TodoList__user-button--selected':
                        todo.userId === selectedUserId,
                      },
                    )}
                    type="button"
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
