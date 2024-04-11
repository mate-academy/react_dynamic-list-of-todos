import { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getDisplayedTodos } from '../../utis';
type Props = {
  todos: Todo[];
  updateTodos: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, updateTodos }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const timerID = useRef(0);

  useEffect(() => {
    let displayedTodos = getDisplayedTodos(todos, filter, '');

    updateTodos(displayedTodos);

    if (query) {
      timerID.current = window.setTimeout(() => {
        displayedTodos = getDisplayedTodos(todos, filter, query);

        updateTodos(displayedTodos);
      }, 1000);
    }
  }, [todos, filter, query]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={e => {
              setFilter(e.target.value);
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
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
