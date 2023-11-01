import React, { } from 'react';

type Props = {
  select: string;
  query: string;
  setSelect: (query: string) => void;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  select,
  query,
  setSelect,
  setQuery,
}) => {
  const isVisibleDeleteButton = query || select;
  const reset = () => {
    setQuery('');
    setSelect('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={select}
            data-cy="statusSelect"
            onChange={event => setSelect(event.target.value)}
          >
            <option value="all">
              All
            </option>

            <option value="active">
              Active
            </option>

            <option value="completed">
              Completed
            </option>
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
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {isVisibleDeleteButton && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
