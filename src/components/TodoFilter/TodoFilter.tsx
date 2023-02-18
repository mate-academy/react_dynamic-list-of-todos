import React from 'react';

type Props = {
  sortBy: string
  query: string
  onHandleSelect: (sortField: string) => void,
  onHandleChangeQuery: (searchString: string) => void,
};

export const TodoFilter: React.FC<Props> = React.memo(({
  sortBy,
  query,
  onHandleSelect,
  onHandleChangeQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortBy}
            onChange={({ target }) => {
              onHandleSelect(target.value);
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
          value={query}
          onChange={({ target }) => {
            onHandleChangeQuery(target.value);
          }}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onHandleChangeQuery('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
});
