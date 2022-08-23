import { FC } from 'react';

interface Props {
  filteringBy: string,
  ChangeFiltering: (filteringBy: string) => void,
  query: string,
  ChangeQuery: (query: string) => void,
}

export const TodoFilter: FC<Props> = ({
  filteringBy,
  ChangeFiltering,
  query,
  ChangeQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filteringBy}
          onChange={(event) => ChangeFiltering(event.target.value)}
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
        onChange={(event) => ChangeQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {!!query.length && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => ChangeQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
