import React from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  query: string;
  filterType: FilterType;
  onSetQuery: React.Dispatch<React.SetStateAction<string>>;
  onSetFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onSetQuery,
  filterType,
  onSetFilterType,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue={filterType}
            onChange={event =>
              onSetFilterType(event.target.value as FilterType)
            }
          >
            {Object.entries(FilterType).map(type => {
              const [key, value] = type;

              return (
                <option key={key} value={value}>
                  {key}
                </option>
              );
            })}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={event => onSetQuery(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right is-right--pointer">
          {query && (
            <button
              aria-label="Clear query"
              onClick={() => onSetQuery('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
