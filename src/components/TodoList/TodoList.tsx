import React, {
  ChangeEvent, memo, useEffect, useState,
} from 'react';
import { StatusQuery } from '../../StatusQuery';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  onSelectUser: CallableFunction;
  onSelectStatus: CallableFunction;
  selectedUserId: number,
};

export const TodoList: React.FC<Props> = memo(({
  todos, onSelectUser, selectedUserId, onSelectStatus,
}) => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  const filterTodos = (tilteQuery: string) => {
    const newTodos = todos.filter(({ title }) => {
      return title.toLowerCase().includes(tilteQuery.toLowerCase());
    });

    setVisibleTodos(newTodos);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => filterTodos(event.target.value);

  useEffect(() => setVisibleTodos(todos), [todos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        onChange={handleChange}
      />

      <select
        name="status"
        id="statusSelector"
        onChange={(event) => onSelectStatus(event.target.value)}
      >
        <option value={StatusQuery.all}>all</option>
        <option value={StatusQuery.active}>active</option>
        <option value={StatusQuery.completed}>completed</option>
      </select>

      <div className="TodoList__list-container">
        {visibleTodos.length ? (
          <ul className="TodoList__list">
            {visibleTodos.map(({
              completed, title, userId, id,
            }) => (
              <li
                key={id}
                className={`
                  TodoList__item
                  TodoList__item--${completed ? 'checked' : 'unchecked'}
                `}
              >
                <label htmlFor="completed">
                  <input
                    id="completed"
                    type="checkbox"
                    readOnly
                    checked={completed}
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
                  onClick={onSelectUser(userId)}
                >
                  User&nbsp;
                  {userId}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Not found</p>
        )}

      </div>
    </div>
  );
});
