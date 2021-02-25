import React from 'react';
import './TodoList.scss';
import ClassNames from 'classnames';
import { TodoListType } from '../../types';

export class TodoList extends React.Component {
  state = {
    titleSearch: '',
    selectedTodos: '',
  }

  render() {
    const { todos, chooseUser, toggleStatus } = this.props;
    const { selectedTodos, titleSearch } = this.state;
    let filteredTodos = todos.filter(todo => todo.title
      .toLowerCase()
      .includes(titleSearch.toLowerCase()));

    if (selectedTodos === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (selectedTodos === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <form>
          <input
            className="TodoList__list-input"
            type="text"
            placeholder="Search todo"
            onChange={({ target }) => {
              this.setState({ titleSearch: target.value });
            }}
          />

          <select
            className="TodoList__list-select"
            name="select"
            value={selectedTodos}
            onChange={({ target }) => (
              this.setState({ selectedTodos: target.value })
            )}
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(({ id, title, completed, userId }) => (
              <li
                key={id}
                className={ClassNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !completed,
                    'TodoList__item--checked': completed,
                  },
                )}
              >

                <label>
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleStatus(id)}
                    readOnly
                  />
                  <p>{title}</p>
                </label>

                <button
                  className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
                  type="button"
                  onClick={() => chooseUser(userId)}
                >
                  User&nbsp;#
                  {' '}
                  {`${userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = TodoListType;
