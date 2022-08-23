import { FC } from 'react';

interface Props {
  query: string,
  setQuery: (s: string) => void,
  selectBy: string,
  setSelectBy: (v: string) => void,
}

export const TodoFilter: FC<Props> = ({
  query,
  setQuery,
  selectBy,
  setSelectBy,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={selectBy}
          data-cy="statusSelect"
          onChange={(event) => {
            setSelectBy(event.target.value);
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
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
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
            onClick={() => setQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
