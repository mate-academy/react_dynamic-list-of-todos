import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  filterBy: string,
  handleStatus: (value: Status) => void,
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

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  return (
    <form
      className="field has-addons"
      onSubmit={handleSubmit}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            className="option"
            value={filterBy}
            onChange={(event) => handleStatus(event.target.value as Status)}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
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
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="delete"
              onClick={resetInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
