import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends Component {
  state = {
    search: '',
    typeFilter: 'all',
    isShuffle: false,
  };

  static = {
    propTypes: {
      todos: PropTypes.arrayOf(PropTypes.object).isRequired,
      userSelected: PropTypes.func.isRequired,
      selectedUserId: PropTypes.number.isRequired,
    },
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleRandomize = () => {
    this.setState(state => ({ isShuffle: !state.isShuffle }));
  }

  render() {
    const { todos, userSelected, selectedUserId } = this.props;
    const { search, typeFilter, isShuffle } = this.state;
    const options = ['all', 'active', 'completed'];
    let visibleTodos = [...todos];

    if (typeFilter === 'active') {
      visibleTodos = todos.filter(todo => !todo.completed);
    } else if (typeFilter === 'completed') {
      visibleTodos = todos.filter(todo => todo.completed);
    }

    if (isShuffle) {
      visibleTodos.sort(() => Math.random() - 0.5);
    }

    visibleTodos = visibleTodos.filter(
      todo => todo.title.toLowerCase().includes(search.toLowerCase()),
    );

    return (
      <div className="TodoList">
        <form className="search-form">
          <input
            name="search"
            type="text"
            className="search-form__input"
            placeholder="Search..."
            value={search}
            onChange={this.handleChange}
          />

          <select
            name="typeFilter"
            className="search-form__select"
            value={typeFilter}
            onChange={this.handleChange}
          >
            {options.map(option => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="my-button"
            onClick={this.handleRandomize}
          >
            Randomize
          </button>

        </form>

        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item ${todo.completed
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked'
                }`}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  type="button"
                  className={`TodoList__user-button button`
                  + `${todo.userId === selectedUserId
                    ? ' TodoList__user-button--selected'
                    : ''}`}
                  onClick={() => userSelected(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
