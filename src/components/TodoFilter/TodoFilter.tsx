import { FC } from 'react';
import { Filter, FILTER } from '../../constants/filter';

type Props = {
  searchQuery: string,
  filter: Filter,
  onSearchQueryChange: (searchQuery: string) => void,
  onFilterChange: (filter: Filter) => void,
};

export const TodoFilter: FC<Props> = ({
  searchQuery,
  filter,
  onFilterChange: setFilter,
  onSearchQueryChange: setSearchQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            className="is-capitalized"
            onChange={(e) => setFilter(e.target.value as Filter)}
          >
            {Object.values(FILTER).map((value) => (
              <option value={value} key={value}>{value}</option>
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
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
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
              onClick={() => setSearchQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
