import React, { useEffect, useState } from 'react';
import { Filter, FilterField } from '../../types/Filter';

type Props = {
  onFilter: (filter: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({ onFilter }) => {
  const [query, setQuery] = useState('');
  const [filterField, setFilterField] = useState<FilterField>(FilterField.All);

  useEffect(() => {
    onFilter({ filterField, query });
  }, [query, filterField]);

  const handleChangeFilterField
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterField(event.target.value as FilterField);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleDeleteQuery = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterField}
            onChange={handleChangeFilterField}
          >
            <option value={FilterField.All}>All</option>
            <option value={FilterField.Active}>Active</option>
            <option value={FilterField.Completed}>Completed</option>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
