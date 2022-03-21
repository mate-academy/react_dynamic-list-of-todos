import React, { useState } from 'react';
import classNames from 'classnames';

import './TodoList.scss';

type Props = {
  onSelect: (userId: number) => void,
  userId: number,
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({
  onSelect,
  userId,
  todos,
}) => {
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const prepearedTodos = () => {
    const loweredQuery = query.toLowerCase();

    const filteredTodosByInput = todos.filter(todo => (
      todo.title.toLowerCase().includes(loweredQuery)
    ));

    switch (selectValue) {
      case 'active':
        return filteredTodosByInput.filter(todo => !todo.completed);
      case 'completed':
        return filteredTodosByInput.filter(todo => todo.completed);

      default:
        return filteredTodosByInput;
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        onChange={(event) => setQuery(event.target.value)}
      />

      <select
        id="select"
        onChange={(event) => setSelectValue(event.target.value)}
        value={selectValue}
      >
        <option value="all">
          All
        </option>

        <option value="active">
          Active
        </option>

        <option value="completed">
          Completed
        </option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {
            prepearedTodos().map(todo => (
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
                <label htmlFor={`${todo.id}`}>
                  <input
                    id={`${todo.id}`}
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': todo.userId === userId },
                  )}
                  type="button"
                  onClick={() => onSelect(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
