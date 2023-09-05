import React, { useEffect, useState } from 'react';
import { Filter } from '../../types/FIlter';

type Props = {
  filter: Filter
  updateFilter: (newFilter: Filter) => void,
  updateQuery: (newQuery: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  updateFilter,
  updateQuery,
}) => {
  const [valueSelect, setValueSelect] = useState<Filter>(filter);
  const [valueSearch, setValueSearch] = useState('');

  useEffect(() => {
    updateQuery(valueSearch);
  }, [valueSearch]);

  useEffect(() => {
    updateFilter(valueSelect);
  }, [valueSelect]);

  const handlerSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValueSelect(event.target.value as Filter);
  };

  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(event.target.value);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={valueSelect}
            data-cy="statusSelect"
            onChange={handlerSelect}
          >
            {Object.values(Filter).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={valueSearch}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handlerSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {valueSearch.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="delete"
              onClick={() => setValueSearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
