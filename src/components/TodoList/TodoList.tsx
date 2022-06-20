import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

type Props = {
  setUseId: (id: number) => void;
  todos: Todo[];
  selectedUserId: number;
};

enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoList: React.FC<Props> = ({
  setUseId,
  todos,
  selectedUserId,
}) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<Status | string>(Status.All);

  const shownTodo = todos.filter(todo => {
    switch (status) {
      case Status.Completed:
        return todo.title.toLowerCase().includes(title.toLowerCase())
        && todo.completed;
      case Status.Active:
        return todo.title.toLowerCase().includes(title.toLowerCase())
        && !todo.completed;
      default:
        return todo.title.toLowerCase().includes(title.toLowerCase());
    }
  });

  return (
    <div className="TodoList">
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="titleInput">Title: </label>
        <input
          type="text"
          id="titleInput"
          data-cy="filterByTitle"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <label htmlFor="status"> Status: </label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={event => setStatus(event.target.value)}
        >
          <option value="all" selected>All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </form>
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {shownTodo.map(todo => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                ' TodoList__item--checked': todo.completed,
                ' TodoList__item--unchecked': !todo.completed,
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
                data-cy="userButton"
                className={classNames('TodoList__user-button', 'button', {
                  'TodoList__user-button--selected':
                    selectedUserId === todo.userId,
                })}
                type="submit"
                onClick={() => setUseId(todo.userId)}
              >
                {`User ${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
