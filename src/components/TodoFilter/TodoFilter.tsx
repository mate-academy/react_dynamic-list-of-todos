import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  query: string,
  handleFoundTodos: (event: React.ChangeEvent<HTMLInputElement>) => void,
  setFilterValue: (str: string) => void,
  filterValue: string,
  setQuery: (str: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleFoundTodos,
  setFilterValue,
  filterValue,
  setQuery,
}) => {
  const clearQuery = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
          >
            <option
              value={Status.All}
            >
              All
            </option>
            <option
              value={Status.Active}
            >
              Active
            </option>
            <option
              value={Status.Completed}
            >
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
          onChange={handleFoundTodos}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <label>
            {query && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                aria-labelledby="button-label"
                onClick={clearQuery}
              />
            )}
          </label>
        </span>
      </p>
    </form>
  );
};
