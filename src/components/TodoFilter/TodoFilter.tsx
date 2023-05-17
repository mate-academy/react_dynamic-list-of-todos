import React from 'react';

interface Props {
  filter: string,
  setFilter: (option: string) => void,
  value: string,
  setValue: (query: string) => void,
}

export const TodoFilter: React.FC<Props> = React.memo(({
  filter,
  setFilter,
  value,
  setValue,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
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
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>
      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {value && (
        /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setValue('')}
          />
        )}
      </span>

    </p>
  </form>
));
