import React from 'react';

type Props = {
  filterBy: string,
  handleStatus: (str: string) => void,
  query: string,
  setQuery: (str: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  handleStatus,
  query,
  setQuery,
}) => {
  const resetInput = () => {
    setQuery('');
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            className="option"
            value={filterBy}
            onChange={(event) => handleStatus(event.target.value)}
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
          onChange={handleChangeInput}
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
              onClick={resetInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
