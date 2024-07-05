import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

type TodoFilterProps = {
  onQuery: (query: string) => void;
  onSelectBy: (selectBy: string) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onQuery,
  onSelectBy,
}) => {
  const [query, setQuery] = useState('');

  const applyQuery = useCallback(
    debounce(q => onQuery(q), 300),
    [],
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    applyQuery(e.target.value);
  };

  const handleQueryReset = () => {
    setQuery('');
    applyQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => onSelectBy(e.target.value)}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
