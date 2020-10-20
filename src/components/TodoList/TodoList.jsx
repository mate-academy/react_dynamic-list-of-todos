import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export class TodoList extends React.Component {
  state = {
    search: '',
    status: '',
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  }

  handleSelect = (event) => {
    this.setState({
      status: event.target.value,
    });
  }

  render() {
    let { todos } = this.props;
    const {
      selectedUserId,
      selectUser,
      handleChecked,
      randomizeTodos,
    } = this.props;
    const { search, status } = this.state;
    const statusArr = ['all', 'active', 'complited'];

    todos = todos.filter(
      (todo) => {
        switch (status) {
          case statusArr[1]:
            return !todo.completed;
          case statusArr[2]:
            return todo.completed;
          default:
            return todo;
        }
      },
    ).filter(
      todo => todo.title.toLowerCase().includes(search.toLowerCase()),
    );

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <div className="TodoList__filter">
            <label htmlFor="search">
              Search
              <input
                type="text"
                id="search"
                value={search}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="complite">
              Complite
              <select
                name="complite"
                id="complite"
                value={status}
                onChange={this.handleSelect}
              >
                {statusArr.map(option => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <button
              className="button"
              type="submit"
              onClick={randomizeTodos}
            >
              Randomize
            </button>
          </div>

          <ul className="TodoList__list">

            {todos.map(todo => (
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
                <Todo
                  todo={todo}
                  selectedUserId={selectedUserId}
                  selectUser={selectUser}
                  handleChecked={handleChecked}
                />
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
    userId: PropTypes.number,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  handleChecked: PropTypes.func.isRequired,
  randomizeTodos: PropTypes.func.isRequired,
};
