import { ChangeEvent } from 'react';

type Props = {
  status: string;
  setStatus: (arg: string) => (string) | void;
  query: string;
  setQuery: (arg: string) => (string) | void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  setStatus,
  query,
  setQuery,
}) => {
  const handleStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.currentTarget.value);
  };

  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatus}
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
          onChange={handleText}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
            <>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            </>
          )}
        </span>
      </p>
    </form>
  );
};
