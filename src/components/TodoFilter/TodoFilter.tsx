import React from 'react';
import { SortType } from '../../types/SortType';

type Props = {
  onChangeSortField: (SortType: SortType) => void;
  sortField: SortType;
  onChangeQuery: (event: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onChangeSortField,
  sortField,
  onChangeQuery,
  query,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeQuery(event.target.value);
  };

  const handleSortTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onChangeSortField(event.target.value as SortType);
  };

  const handleClearInput = () => {
    onChangeQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            className="is-capitalized"
            data-cy="statusSelect"
            value={sortField}
            onChange={handleSortTypeChange}
          >
            {Object.values(SortType).map(option => (
              <option
                className="is-capitalized"
                value={option}
                key={option}
              >
                {option}
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearInput}
              aria-label="clearInput"
            />
          )}
        </span>
      </p>
    </form>
  );
};
