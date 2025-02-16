import { ChangeEvent } from 'react';

import { FilterOption } from '../../enums/filter-options';

type Props = {
  filterOption: FilterOption;
  searchQuery: string;
  onFilterTodos: (event: ChangeEvent<HTMLSelectElement>) => void;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetSearch: () => void;
};

const filterOptionsArray = Object.values(FilterOption);

export const TodoFilter: React.FC<Props> = ({
  filterOption,
  searchQuery,
  onFilterTodos,
  onSearch,
  onResetSearch,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterOption}
          onChange={onFilterTodos}
        >
          {filterOptionsArray.map(option => {
            const optionTitle =
              option.charAt(0).toUpperCase() + option.slice(1);

            return (
              <option value={option} key={option}>
                {optionTitle}
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
        value={searchQuery}
        onChange={onSearch}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onResetSearch}
          />
        </span>
      )}
    </p>
  </form>
);
