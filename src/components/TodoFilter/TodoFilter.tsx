/* eslint-disable jsx-a11y/control-has-associated-label */
import { ChangeEvent } from 'react';

type Props = {
  selectStatus: string,
  query: string,
  setSelectStatus: (arg: string) => (string) | void;
  setQuery: (value: string) => (string) | void;
};

export const TodoFilter: React.FC<Props> = ({
  selectStatus,
  query,
  setSelectStatus,
  setQuery,
}) => {
  const handleQueryReset = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleSelectStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectStatus(event.currentTarget.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectStatus}
            onChange={handleSelectStatus}
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
          onChange={handleQueryReset}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
