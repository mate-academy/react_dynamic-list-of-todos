import React from 'react';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  filter: string;
  setFilter: (value: TodoStatus) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  query,
  setQuery,
}) => {
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as TodoStatus);
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue={TodoStatus.All}
            value={filter}
            onChange={handleFilterChange}
          >
            {Object.entries(TodoStatus).map(([key, value]) => (
              <option value={value} key={key}>
                {key}
              </option>
            ))}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        {query && (
          <span className="icon is-right">
            <button
              data-cy="clearSearchButton"
              type="button"
              aria-label="Clear Search Button"
              className="delete"
              onClick={clearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
