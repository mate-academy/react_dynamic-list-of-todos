import React from 'react';
import { FilterOption } from '../../types/FilterOption';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  filterOption: string;
  setFilterOption: (value: FilterOption) => void;
};

const optionsList: string[] = [];

for (const value of Object.values(FilterOption)) {
  optionsList.push(value);
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filterOption,
  setFilterOption,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterOption}
            onChange={event =>
              setFilterOption(event.target.value as FilterOption)
            }
          >
            {optionsList.map(option => {
              const optionCapitalised =
                option.slice(0, 1).toUpperCase() +
                option.slice(1, option.length);

              return (
                <option value={option} key={option}>
                  {optionCapitalised}
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
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right filter__button-reset">
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
