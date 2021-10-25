import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

interface Props {
  todos: Todo[],
  selectedUserId: (id: number) => void,
  userId: number,
}

interface State {
  searchField: string,
  sortBy: string,
}

export class TodoList extends React.Component<Props, State> {
  state = {
    searchField: '',
    sortBy: 'all',
  };

  render() {
    const { todos, selectedUserId } = this.props;
    const { searchField, sortBy } = this.state;

    let filteredTodos = todos.filter(todo => todo.title.includes(searchField));

    switch (sortBy) {
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed === true);
        break;

      case 'active':
        filteredTodos = filteredTodos.filter(todo => todo.completed === false);
        break;

      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          value={searchField}
          placeholder="Search"
          onChange={(event) => {
            this.setState({ searchField: event.currentTarget.value });
          }}
        />
        <select
          value={sortBy}
          onChange={(event) => {
            this.setState({ sortBy: event.currentTarget.value });
          }}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )}
              >
                <label htmlFor="input">
                  <input
                    type="checkbox"
                    id="input"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'Todolist__user-button--selected': todo.userId === this.props.userId },
                  )}
                  type="button"
                  onClick={() => selectedUserId(todo.userId)}
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
