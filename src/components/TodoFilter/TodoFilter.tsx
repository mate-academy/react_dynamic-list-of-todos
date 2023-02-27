import { FC, memo } from 'react';

interface Props {
  onChangeQuery: (str: string) => void;
  onChangeComplitedFilter: (str: string) => void;
  query: string;
  complitedFilter: string;
  onClearQueryFilter: () => void;
}

export const TodoFilter: FC<Props> = memo(({
  onChangeQuery,
  onChangeComplitedFilter,
  onClearQueryFilter,
  query,
  complitedFilter,
}) => (

  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={complitedFilter}
          onChange={(event) => onChangeComplitedFilter(event.target.value)}
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
        onChange={(event) => onChangeQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClearQueryFilter}
          />
        </span>
      )}

    </p>
  </form>
));
