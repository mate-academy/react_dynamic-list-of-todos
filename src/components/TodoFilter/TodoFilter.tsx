import { FC } from 'react';
import { Filter } from '../../types/EnumFilter';

type Props = {
  onSearch: (value: string) => void,
  onFilter: (value: Filter) => void,
  query: string,
};

export const TodoFilter: FC<Props> = ({ onSearch, onFilter, query }) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={({ target }) => onFilter(target.value as Filter)}
        >
          <option value={Filter.ALL}>All</option>
          <option value={Filter.ACTIVE}>Active</option>
          <option value={Filter.COMPLETED}>Completed</option>
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
        onChange={({ target }) => onSearch(target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          <button
            aria-label="clearSearchBtn"
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSearch('')}
          />
        )}
      </span>
    </p>
  </form>
);
