import React, {
  ChangeEvent, memo, useMemo, useState,
} from 'react';
import '../../styles/general.scss';
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
  const [query, setQuery] = useState('');

  const filteredTodos = useMemo(() => {
    return todos.filter(({ title }) => (
      title.toLowerCase()
        .includes(query.toLowerCase())
    ));
  }, [todos, query]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        className="input input--center input--outline"
        onChange={handleChange}
        value={query}
      />

      <select
        name="status"
        className="input input--one-line"
        id="statusSelector"
        onChange={(event) => onSelectStatus(event.target.value)}
      >
        <option value={StatusQuery.All}>all</option>
        <option value={StatusQuery.Active}>active</option>
        <option value={StatusQuery.Completed}>completed</option>
      </select>

      <div className="TodoList__list-container">
        {todos.length ? (
          <ul className="TodoList__list">
            {filteredTodos.map(({
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
