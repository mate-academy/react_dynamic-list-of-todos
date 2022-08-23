import { FC } from 'react';

interface Props {
  searchQuery: string,
  setSearchQuery: (s: string) => void,
  completedFilter: string,
  setCompletedFilter: (v: string) => void,
}

export const TodoFilter: FC<Props> = ({
  searchQuery,
  setSearchQuery,
  completedFilter,
  setCompletedFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={completedFilter}
          data-cy="statusSelect"
          onChange={(event) => {
            setCompletedFilter(event.target.value);
          }}
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
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
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
