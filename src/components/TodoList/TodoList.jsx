import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.scss';
import classnames from 'classnames';

export class TodoList extends React.Component {
  state = {
    userId: 0,
    query: '',
    select: '',
    shuffle: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      shuffle: false,
    });
  }

  toTitleSearch = (todo) => {
    const { query } = this.state;

    if (todo.title !== null) {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    }

    return false;
  }

  toSelectFilter = (todo) => {
    const { select } = this.state;

    switch (select) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  }

  hangleSuffled = () => {
    this.setState({
      shuffle: true,
      select: '',
    });
  }

  render() {
    const { todos, checkTodo, checkUser } = this.props;
    const { userId, query, select, shuffle } = this.state;
    const filtredTodos = todos.filter(this.toTitleSearch)
      .filter(this.toSelectFilter);

    const suffledTodos = todos.map(todo => ({
      sort: Math.random(),
      value: todo,
    }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);

    const checkedTodos = shuffle
      ? suffledTodos
      : filtredTodos;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            type="text"
            name="query"
            className="TodoList__title"
            value={query}
            placeholder="write ro search by title"
            onChange={this.handleChange}
          />
          <div className="TodoList__buttons">
            <select
              name="select"
              className="TodoList__checkbox"
              value={select}
              onChange={this.handleChange}
            >
              <option value="" disabled>choose filter</option>
              <option value="all">all</option>
              <option value="active">active</option>
              <option value="completed">completed</option>
            </select>
            <button
              type="button"
              className="TodoList__random-button"
              onClick={this.hangleSuffled}
            >
              Randomize
            </button>
          </div>
          <ul className="TodoList__list">
            {checkedTodos.map(todo => (
              <li
                key={todo.id}
                className={classnames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label>
                  <input
                    type="checkbox"
                    name="remember"
                    checked={todo.completed}
                    readOnly
                    onClick={() => checkTodo(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classnames('button',
                    'TodoList__user-button', {
                      'TodoList__user-button--selected': userId !== todo.userId,
                    })}
                  type="button"
                  onClick={() => {
                    this.setState({
                      userId: todo.userId,
                    });
                    checkUser(todo.userId);
                  }}
                >
                  User&nbsp;
                  { todo.userId }
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string,
    }).isRequired,
  ).isRequired,
  checkTodo: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
};
