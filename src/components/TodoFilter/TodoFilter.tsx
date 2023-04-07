import { FC } from 'react';
import { FilterType } from '../../types/FilterType.enum';

type Props = {
  query: string;
  onSelectChange: (value: FilterType) => void;
  onQueryChange: (value: string) => void;
};

export const TodoFilter: FC<Props> = ({
  query,
  onSelectChange,
  onQueryChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => onSelectChange(event.target.value as FilterType)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
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
        onChange={(event) => onQueryChange(event.target.value)}
      />

      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onQueryChange('')}
            aria-label="clear search text"
          />
        </span>
      )}
    </p>
  </form>
);
