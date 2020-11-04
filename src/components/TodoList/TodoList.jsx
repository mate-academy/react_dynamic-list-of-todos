import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classNames from 'classnames';
import { TodoShape } from '../../shapes/TodoShape';
import { FilterField } from '../FilterField';

export class TodoList extends Component {
  state = {
    search: '',
    shownTodos: 'all',
  }

  filterByAccomplishment = {
    all: () => true,
    active: todo => !todo.completed,
    completed: todo => todo.completed,
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, selectUser, shuffleTodos, selectedUserId } = this.props;
    const { search, shownTodos } = this.state;
    const { handleChange, filterByAccomplishment } = this;

    const filteredTodos = todos
      .filter(todo => todo.title.toLowerCase().includes(search.toLowerCase())
        && filterByAccomplishment[shownTodos](todo));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <FilterField
          search={search}
          handleChange={handleChange}
          shownTodos={shownTodos}
          shuffleTodos={shuffleTodos}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(({ id, userId, completed, title }) => (
              <li
                key={id}
                className={classNames('TodoList__item',
                  {
                    'TodoList__item--unchecked': !completed,
                    'TodoList__item--checked': completed,
                  })}
              >
                <label>
                  <input type="checkbox" checked={completed} readOnly />
                  <p>{title}</p>
                </label>

                <button
                  className={classNames('button TodoList__user-button', {
                    // eslint-disable-next-line max-len
                    'TodoList__user-button--selected': userId === selectedUserId,
                  })}
                  type="button"
                  onClick={() => selectUser(userId)}
                >
                  {`UserId #${userId}`}
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
  todos: PropTypes.arrayOf(TodoShape).isRequired,
  selectUser: PropTypes.func.isRequired,
  shuffleTodos: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
