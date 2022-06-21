import React, { useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
  changeUser: (userId: number) => void;
  selectedUserId: number;
}

enum Options {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoList: React.FC<Props> = ({
  todos, changeUser, selectedUserId,
}) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const filteredByTitle = todos.filter(todo => todo.title.includes(title));

  const filteredByStatus = filteredByTitle.filter(todo => {
    switch (status) {
      case Options.all:
        return true;

      case Options.active:
        return !todo.completed;

      case Options.completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        placeholder="Enter the title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="all"> All </option>
        <option value="active"> Active </option>
        <option value="completed"> Completed </option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredByStatus.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
            >
              <label htmlFor={`${todo.id}`}>
                <input
                  type="checkbox"
                  id={`${todo.id}`}
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  {
                    'TodoList__user-button--selected':
                    selectedUserId === todo.userId,
                  },
                  'button',
                )}
                type="button"
                onClick={() => {
                  changeUser(todo.userId);
                }}
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
};
