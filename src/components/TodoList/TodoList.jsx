import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { todoType } from '../../propTypes/todoType';

export class TodoList extends React.Component {
  state = {
    inputValue: '',
    selectValue: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { todos, selectUser, selectedUserId, selectedTodoId } = this.props;
    const { inputValue, selectValue } = this.state;

    let filteredTodos = todos;

    if (selectValue === 'active') {
      filteredTodos = todos
        .filter(todo => !todo.completed);
    }

    if (selectValue === 'completed') {
      filteredTodos = todos
        .filter(todo => todo.completed);
    }

    if (inputValue) {
      filteredTodos = filteredTodos
        .filter(todo => (
          todo.title.toLowerCase().includes(inputValue.toLowerCase())
        ));
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form className="TodoList__form">
          <input
            type="text"
            className="TodoList__input"
            placeholder="Type search word"
            name="inputValue"
            value={inputValue}
            onChange={this.handleChange}
          />

          <select
            name="selectValue"
            value={selectValue}
            className="TodoList__select"
            onChange={this.handleChange}
          >
            <option value="all">
              Show all
            </option>

            <option value="active">
              Show active
            </option>

            <option value="completed">
              Show completed
            </option>
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={
                  classNames('TodoList__item', {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  })
                }
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onClick={!todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={
                    classNames('TodoList__user-button button', {
                      'TodoList__user-button--selected':
                        todo.userId === selectedUserId
                        && selectedTodoId === todo.id,
                    })
                  }
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId, todo.id);
                  }}
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

TodoList.propTypes = {
  todos: PropTypes.arrayOf(todoType).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectedTodoId: PropTypes.number.isRequired,
};
