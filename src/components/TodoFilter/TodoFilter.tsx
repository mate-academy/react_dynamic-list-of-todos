import { FC } from 'react';
import { FilterBy } from '../../App';

interface Props {
  onFilter: (value: FilterBy) => void;
  onQuery: (value: string) => void;
  query: string;
}

export const TodoFilter: FC<Props> = ({ onFilter, onQuery, query }) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={e => onFilter(e.target.value as FilterBy)}
        >
          <option value={FilterBy.All}>All</option>
          <option value={FilterBy.Active}>Active</option>
          <option value={FilterBy.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        onChange={e => onQuery(e.target.value)}
        value={query}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            onClick={() => onQuery('')}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        )}
      </span>
    </p>
  </form>
);
