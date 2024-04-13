import { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../../Store';
import { Filter } from '../../types/Filter';

export const TodoFilter: React.FC = () => {
  const { setAppliedQuery, filter, setFilter } = useContext(TodoContext);
  const [query, setQuery] = useState('');
  const timerID = useRef(0);

  useEffect(() => {
    window.clearTimeout(timerID.current);
    timerID.current = window.setTimeout(() => {
      setAppliedQuery(query);
    }, 1000);
  }, [query, setAppliedQuery]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={e => {
              setFilter(e.target.value as Filter);
            }}
          >
            <option value={Filter.all}>All</option>
            <option value={Filter.active}>Active</option>
            <option value={Filter.completed}>Completed</option>
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
