import React, { } from 'react';
import { Option } from '../../types/FilterOptions';

type Props = {
  select: string;
  query: string;
  setSelect: (select: string) => void;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  select,
  query,
  setSelect,
  setQuery,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.target.value);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={select}
            data-cy="statusSelect"
            onChange={handleSelect}
          >
            {Object.values(Option).map(option => {
              const normalizeOptionText = option
                .replace(option[0], option[0].toUpperCase());

              return (
                <option value={option} key={option}>
                  {normalizeOptionText}
                </option>
              );
            })}
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
