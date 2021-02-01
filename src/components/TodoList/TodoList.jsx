import React from 'react';
import PropTypes, { bool } from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    inputTittle: '',
    selectTodos: 'all',
  }

  filterByTitle = (task) => {
    const { inputTittle } = this.state;

    if (inputTittle) {
      return task.title !== null
      && task.title.toLowerCase().includes(inputTittle.toLowerCase());
    }

    return task;
  }

  filterByStatus = (task) => {
    const { selectTodos } = this.state;

    switch (selectTodos) {
      case ('Active'):
        return task.completed === false;

      case ('Completed'):
        return task.completed === true;

      default:
        return task;
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { todos, selectUser } = this.props;
    const { inputTittle, selectTodos } = this.state;

    const visibleTodos = todos
      .filter(this.filterByTitle)
      .filter(this.filterByStatus);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            type="text"
            value={inputTittle}
            onChange={this.handleChange}
            name="inputTittle"
            placeholder="Filter by title"
          />
          <select
            value={selectTodos}
            onChange={this.handleChange}
            name="selectTodos"
          >
            <option name="">Show Todos</option>
            <option name="active">Active</option>
            <option name="completed">Completed</option>
            <option name="all">All</option>
          </select>
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  })}
              >
                <label>
                  <input type="checkbox" />
                  <p>{todo.title}</p>
                </label>

                <button
                  onClick={() => selectUser(todo.userId)}
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
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
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    completed: bool,
    userId: PropTypes.number,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
};
