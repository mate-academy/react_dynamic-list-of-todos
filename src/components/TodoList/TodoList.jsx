import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    filterTitle: '',
    showSelectOfTodos: [`active`, `completed`],
    selectTodos: '',
  }

  getFilteresTodos = (todos, selectTodos, filterTitle) => {
    const array = todos.filter(
      (todo) => {
        switch (selectTodos) {
          case `active`:
            return !todo.completed;
          case `completed`:
            return todo.completed;
          default:
            return todo;
        }
      },
    ).filter(todo => todo.title.toLowerCase()
      .includes(filterTitle.toLowerCase()));

    return array;
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { todos, selectUser, randomize, checkOnCompletedTodos } = this.props;
    const { filterTitle, selectTodos, showSelectOfTodos } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="App__input">
          <label className="filterByTitle">
            <input
              className="filterByTitle"
              type="text"
              name="filterTitle"
              placeholder="put name of todo"
              value={filterTitle}
              onChange={this.handleChange}
            />
            <span className="bar" />
          </label>

        </div>
        <div className="App__select">

          <label htmlFor="complite">
            Filter todos by select methods
          </label>
          <select
            name="selectTodos"
            value={selectTodos}
            onChange={this.handleChange}
          >
            <option value="all">
              all
            </option>
            {showSelectOfTodos.map(todo => (
              <option
                key={todo}
                value={todo}
              >
                {todo}
              </option>
            ))}
          </select>
        </div>
        <div className="App__randomize">
          <button
            className="randomize"
            type="button"
            onClick={() => randomize()}
          >
            Randomize
          </button>
        </div>
        <ul>
          {this.getFilteresTodos(todos, selectTodos, filterTitle).map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                todo.completed
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked',
              )}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => checkOnCompletedTodos(todo.id)}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>
              {todo.completed
                ? (
                  <button
                    className="TodoList__user-button button"
                    type="button"
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                )
                : (
                  <button
                    className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                    type="button"
                    onClick={() => selectUser(todo.userId)}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                )
              }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  selectUser: PropTypes.func.isRequired,
  randomize: PropTypes.func.isRequired,
  checkOnCompletedTodos: PropTypes.func.isRequired,

  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
};

TodoList.defaultProps = {
  todos: [],
};
