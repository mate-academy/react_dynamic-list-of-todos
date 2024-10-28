import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

type Props = {
  setFilter: (filter: string) => void;
  setSearch: (search: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ setFilter, setSearch }) => {
  const [currentSearch, setCurrentSearch] = useState('');

  const debouncedSetSearch = useCallback(debounce(setSearch, 500), []);

  useEffect(() => {
    if (currentSearch) {
      debouncedSetSearch(currentSearch.trim());
    } else {
      setSearch('');
    }

    return () => {
      debouncedSetSearch.cancel();
    };
  }, [currentSearch, debouncedSetSearch, setSearch]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={element => setFilter(element.target.value)}
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
          value={currentSearch}
          onChange={element => {
            setCurrentSearch(element.target.value);
          }}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {currentSearch && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setCurrentSearch('');
                setSearch('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
