import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  onSelectedUserId: (id: number) => void,
  todoTitle: string,
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  status: string,
  onSelectStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  onSelectedUserId,
  todoTitle,
  onSearch,
  status,
  onSelectStatus,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <input
      type="text"
      className="TodoList__input"
      placeholder="Enter Todo title"
      value={todoTitle}
      onChange={onSearch}
    />
    <select
      value={status}
      onChange={onSelectStatus}
    >
      <option value="all">all</option>
      <option value="active">active</option>
      <option value="completed">completed</option>
    </select>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item', {
              'TodoList__item--checked': todo.completed,
              'TodoList__item--unchecked': !todo.completed,
            })}
          >
            <label htmlFor="input">
              <input
                type="checkbox"
                id="input"
                readOnly
                checked={todo.completed}
              />
              <p>{todo.title}</p>
            </label>

            <button
              type="button"
              className={classNames(
                'Todolist__user-button',
                'button',
                { 'TodoList__user-button--selected': todo.id === selectedUserId },
              )}
              onClick={() => onSelectedUserId(todo.userId)}
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
