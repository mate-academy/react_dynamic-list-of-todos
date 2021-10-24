import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[],
  selectedUserId: number,
  query: string,
  selectUser: (id: number) => void,
  changeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void,
  selectStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  status: string,
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  selectUser,
  changeQuery,
  selectStatus,
  query,
  status,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <input
      type="text"
      value={query}
      placeholder="find todo"
      onChange={changeQuery}
    />
    <select
      onChange={selectStatus}
      value={status}
      className="App-AddSelect"
    >
      <option
        value="all"
        className="App-AddOption"
      >
        all
      </option>
      <option
        value="active"
        className="App-AddOption"
      >
        active
      </option>
      <option
        value="completed"
        className="App-AddOption"
      >
        completed
      </option>
    </select>
    <div className="TodoList__list-container">

      {todos.map(todo => (
        <ul className="TodoList__list">
          <li
            key={todo.id}
            className={classNames('TodoList__item', {
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
          >
            <label htmlFor="input">
              <input
                id="input"
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames(
                'TodoList__user-button',
                'button',
                { 'TodoList__user-button--selected': todo.userId !== selectedUserId },
              )}
              type="button"
              onClick={() => selectUser(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        </ul>
      ))}
    </div>
  </div>
);
