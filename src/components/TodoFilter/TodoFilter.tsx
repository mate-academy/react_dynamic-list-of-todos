import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  filter: (visibleTodos: Todo[]) => void;
  todos: Todo[];
}

export const TodoFilter: React.FC<Props> = ({ filter, todos }) => {
  const [query, setQuerty] = useState('');
  const [todoStatus, setTodoStatus] = useState('all');

  useEffect(() => {
    filter(todos
      .filter(todo => (
        todo.title.toLowerCase().includes(query.trim().toLowerCase())
      ))
      .filter(todo => {
        switch (todoStatus) {
          case 'all':
            return true;

          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          default:
            throw new Error('wrong todo status');
        }
      }));
  }, [query, todoStatus]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              setTodoStatus(event.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={event => setQuerty(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== '' && (
            <>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => {
                  setQuerty('');
                }}
              />
            </>
          )}
        </span>
      </p>
    </form>
  );
};
