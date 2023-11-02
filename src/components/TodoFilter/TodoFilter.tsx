import { ChangeEvent, FC } from 'react';
import { TodoStatus } from '../../types/TodoStatus';
import { TodoFilterProps } from '../../types/TodoFilterProps';

export const TodoFilter: FC<TodoFilterProps> = ({
  setFilterStatus,
  setSearchQuery,
  searchQuery,
}) => {
  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value as TodoStatus);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleStatusChange}
          >
            {Object.entries(TodoStatus).map(([key, value]) => (
              <option key={value} value={value}>
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
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        {searchQuery && (
          <span
            className="icon is-right"
          >
            <button
              onClick={handleClearSearch}
              onKeyDown={handleClearSearch}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear Search"
            />
          </span>
        )}
      </p>
    </form>
  );
};
