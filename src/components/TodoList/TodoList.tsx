import React, { useState, useEffect, Dispatch } from 'react';

import './TodoList.scss';

interface Props {
  todos: Todo[];
  setSelectedUserId: Dispatch<number>,
}

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedUserId,
}) => {
  const [filterByTitle, setFilterByTitle] = useState<string>('');
  const [isComplete, setIsComplete] = useState('show all');
  const [visibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      const titleToLower = todo.title.toLowerCase();
      const filterByTitleToLower = filterByTitle.toLowerCase();

      switch (isComplete) {
        case 'show all':
          return titleToLower.includes(filterByTitleToLower);

        case 'not completed':
          return titleToLower.includes(filterByTitleToLower)
            && todo.completed === false;

        case 'completed':
          return titleToLower.includes(filterByTitleToLower)
            && todo.completed === true;

        default:
          return todo;
      }
    }));
  }, [filterByTitle, isComplete, todos]);

  return (
    <div className="todoList">
      <h2 className="todoList__title">Todos:</h2>

      <div className="todoList__sort">
        <label className="todoList__label">
          Sort by title:
          <input
            data-cy="filterByTitle"
            className="todoList__input"
            value={filterByTitle}
            onChange={({ target }) => {
              setFilterByTitle(target.value);
            }}
            type="text"
          />
        </label>

        <label className="todoList__label">
          Sort by status:
          <select
            className="TodoList__input"
            name="isCompleted"
            onChange={({ target }) => {
              setIsComplete(target.value);
            }}
          >
            <option value="show all" className="todoList__option">
              Show all
            </option>

            <option value="not completed" className="todoList__option">
              Not completed
            </option>

            <option value="completed" className="todoList__option">
              Completed
            </option>
          </select>
        </label>
      </div>

      <div className="todoList__list-container">
        <ul className="todoList__list">
          {visibleTodos.map(todo => {
            return (
              <li
                key={todo.id}
                className={`todoList__item
                todoList__item--${todo.completed ? 'checked' : 'unchecked'}`}
              >
                <label>
                  <input
                    checked={todo.completed}
                    type="checkbox"
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  type="button"
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  onClick={() => setSelectedUserId(todo.userId)}
                >
                  {todo.userId}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
