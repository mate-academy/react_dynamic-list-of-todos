import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { FilterTodos } from '../../types/FilterTodos';

type Props = {
  findTodo?: (query: string) => void;
  filterTodos?: (filter: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  findTodo = () => {},
  filterTodos = () => {},
}) => {
  const [query, setQuery] = useState('');

  const applyQuery = useCallback(
    debounce(findTodo, 500),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleQueryDelete = () => {
    setQuery('');
    findTodo('');
  };

  const filters = Object.values(FilterTodos);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => filterTodos(event.target.value)}
          >
            {filters.map((nameButton) => (
              <option key={nameButton} value={nameButton}>
                {nameButton}
              </option>
            ))}
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
              onClick={handleQueryDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
