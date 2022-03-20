import React, { useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  userId: number,
  onUserSelect: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  userId,
  onUserSelect,
}) => {
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState<string>('all');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectValue(value);
  };

  const getPreparedTodos = () => {
    const queryCase = query.toLowerCase();

    const preparedTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(queryCase)
    ));

    switch (selectValue) {
      case 'completed':
        return preparedTodos.filter(todo => todo.completed);
      case 'not':
        return preparedTodos.filter(todo => !todo.completed);
      default:
        return preparedTodos;
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <label htmlFor="input">
        Filter by Title:
        {' '}
        <input
          type="text"
          name="input"
          id="input"
          value={query}
          onChange={handleChange}
        />
        <select
          name="select"
          id="select"
          value={selectValue}
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not">Not completed</option>
        </select>
      </label>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {getPreparedTodos().map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                },
              )}
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
                onClick={() => onUserSelect(todo.userId)}
              >
                {`User: ${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
