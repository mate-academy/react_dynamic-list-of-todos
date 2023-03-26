import { FC } from 'react';

type Props = {
  search: (value: string) => void,
  filter: (value: string) => void,
  query: string,
};

export const TodoFilter: FC<Props> = ({ search, filter, query }) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={({ target }) => filter(target.value)}
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
        onChange={({ target }) => search(target.value)}
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
            onClick={() => search('')}
          />
        )}
      </span>
    </p>
  </form>
);
