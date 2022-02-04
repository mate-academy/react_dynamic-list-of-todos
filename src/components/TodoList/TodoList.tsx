import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  onClick: (id: number) => void,
  onChangeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void,
  query: string,
  sortBy: string,
  select: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  selectedUserId: number,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onClick,
  onChangeQuery,
  query,
  sortBy,
  select,
  selectedUserId,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <p>Seach todo:</p>
      <input type="text" value={query} onChange={onChangeQuery} />
      <select
        value={sortBy}
        onChange={select}
      >
        <option value="all">All todos</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={classNames(
              'TodoList__item',
              {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              },
            )}
            key={todo.id}
          >
            <input
              type="checkbox"
              checked={todo.completed}
            />
            <p>{todo.title}</p>

            <button
              className={classNames(
                'button',
                'TodoList__user-button',
                { 'TodoList__user-button--selected': todo.userId === selectedUserId },
              )}
              type="button"
              onClick={() => onClick(todo.userId)}
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
