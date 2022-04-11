import React, { useEffect, useState } from 'react';
import './TodoList.scss';
/* eslint-disable max-len */

interface Props {
  todos: Todo[];
  selectedUserId: number;
  selectUser: (userId: number) => void;
  changeQuery: (status: boolean | null) => void;
}

export const TodoList: React.FC<Props> = React.memo(({
  todos, selectedUserId, selectUser, changeQuery,
}) => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(todos);
  const filterTodos = (searchQuery: string) => {
    setCurrentTodos(
      todos.filter(({ title }) => title.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => filterTodos(e.target.value);

  useEffect(() => setCurrentTodos(todos), [todos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        onChange={changeHandler}
      />

      <select
        name="status"
        id="status"
        onChange={(e) => {
          switch (e.target.value) {
            case 'true':
              changeQuery(true);
              break;
            case 'false':
              changeQuery(false);
              break;
            default:
              changeQuery(null);
          }
        }}
      >
        <option value="null">all</option>
        <option value="false">active</option>
        <option value="true">completed</option>
      </select>

      <div className="TodoList__list-container">
        {currentTodos.length ? (
          <ul className="TodoList__list">
            {currentTodos.map(({
              title, id, userId, completed,
            }) => (
              <li
                key={id}
                className={`
                  TodoList__item
                  TodoList__item--${completed ? 'checked' : 'unchecked'}
                `}
              >
                <label htmlFor="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={completed}
                    readOnly
                  />
                  <p>{title}</p>
                </label>

                <button
                  className={`
                    TodoList__user-button
                    ${selectedUserId !== userId && 'TodoList__user-button--selected'}
                    button
                  `}
                  type="button"
                  onClick={() => selectUser(userId)}
                >
                  {`User #${userId}`}
                </button>
              </li>
            ))}
          </ul>
        ) : <span>no todos</span>}
      </div>
    </div>
  );
});
