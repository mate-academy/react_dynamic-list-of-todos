import React from 'react';
import classnames from 'classnames';

import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    query: '',
    selected: 'all',
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({ query: value });
  }

  filterTodos = (todos, query) => {
    if (!query) {
      return todos;
    }

    return todos.filter((todo) => {
      const { title } = todo;

      if (typeof (title) === 'string'
        && title.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }

      return false;
    });
  }

  display = (todos, selected) => {
    switch (selected) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  handleSelect = (event) => {
    const { value } = event.target;

    this.setState({ selected: value });
  }

  render() {
    const { todos, selectUserId } = this.props;
    const { query, selected } = this.state;

    let preparedTodos = this.filterTodos(todos, query);

    preparedTodos = this.display(preparedTodos, selected);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <form
            action="/"
            className="TodoList__form"
          >
            <input
              type="text"
              name="title"
              className="TodoList__input"
              placeholder="enter title here to find something"
              value={query}
              onChange={this.handleChange}
            />

            <select
              className="TodoList__select"
              name="select"
              value={selected}
              onChange={this.handleSelect}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </form>
          <ul className="TodoList__list">
            {preparedTodos.map(todo => (
              <li
                className={classnames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': !todo.checked,
                })}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>
                    {todo.title}
                  </p>
                </label>

                <button
                  className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                  type="button"
                  onClick={() => {
                    selectUserId(todo.userId);
                  }}
                >
                  User
                  {' #'}
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
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  })).isRequired,
  selectUserId: PropTypes.func.isRequired,
};
