import React from 'react';
import { Select } from '../../types/Select';
import { FilterSelect } from '../FilterSelect';

type Props = {
  filter: Select;
  query: string;
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputReset: () => void;
};

export const TodoFilterBlock:React.FC<Props> = React.memo(({
  filter,
  onFilterChange,
  query,
  onQueryChange,
  onInputReset,
}) => (
  <form className="field has-addons">
    <FilterSelect filter={filter} onFilterChange={onFilterChange} />

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={query}
        onChange={onQueryChange}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            aria-label="clearSearchButton"
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onInputReset}
          />
        </span>
      )}
    </p>
  </form>
));
