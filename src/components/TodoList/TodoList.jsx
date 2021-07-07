import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classNames from 'classnames';

const options = ['all', 'active', 'completed'];

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
    let visibleTodos = [...todos];

    visibleTodos = todos.filter(todo => (
      // eslint-disable-next-line no-nested-ternary
      (typeFilter === 'active')
        ? !todo.completed
        : (typeFilter === 'completed')
          ? todo.completed
          : todo
    ));

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
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
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
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected':
                      todo.userId === selectedUserId,
                    },
                  )}
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
