import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[],
  selectUserId: (id: number) => void
  userId: number,
}

interface State {
  searchQuery: string;
  sortBy: string;
}

export class TodoList extends React.Component<Props, State> {
  state = {
    searchQuery: '',
    sortBy: 'all',
  };

  render() {
    const { todos, selectUserId } = this.props;
    const { searchQuery, sortBy } = this.state;

    let filteredTodos = todos.filter(todo => {
      return todo.title.includes(searchQuery);
    });

    switch (sortBy) {
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => {
          return todo.completed === true;
        });
        break;
      case 'active':
        filteredTodos = filteredTodos.filter(todo => {
          return todo.completed === false;
        });
        break;
      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          value={searchQuery}
          placeholder="Search"
          onChange={(event) => {
            this.setState({ searchQuery: event.currentTarget.value });
          }}
        />
        <select
          onChange={(event) => {
            this.setState({ sortBy: event.currentTarget.value });
          }}
          value={sortBy}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Not completed</option>
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
                    { 'TodoList__user-button--selected': todo.userId === this.props.userId },
                  )}
                  type="button"
                  onClick={() => selectUserId(todo.userId)}
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
