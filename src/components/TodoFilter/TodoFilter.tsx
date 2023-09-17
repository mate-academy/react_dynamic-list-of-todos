import React, { ChangeEvent, memo } from 'react';

import { TodoStatus, FilterOptions } from '../../types';

type Props = {
  options: FilterOptions;
  onOptionsChange: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

export const TodoFilter: React.FC<Props> = memo(({
  options,
  onOptionsChange,
}) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onOptionsChange((currentOptions) => ({
      ...currentOptions,
      status: event.target.value as TodoStatus,
    }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange((currentOptions) => ({
      ...currentOptions,
      query: event.target.value,
    }));
  };

  const handleResetClick = () => {
    onOptionsChange((currentOptions) => ({
      ...currentOptions,
      query: '',
    }));
  };

  const { status, query } = options;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={status}
            onChange={handleSelectChange}
            data-cy="statusSelect"
            className="is-capitalized"
          >
            {Object.values(TodoStatus).map(todoStatus => (
              <option
                key={todoStatus}
                value={todoStatus}
                className="is-capitalized"
              >
                {todoStatus}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={handleInputChange}
          type="text"
          className="input"
          data-cy="searchInput"
          placeholder="Search..."
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right">
          {query && (
            <button
              type="button"
              className="delete"
              aria-label="Clear Search"
              data-cy="clearSearchButton"
              onClick={handleResetClick}
            />
          )}
        </span>
      </p>
    </form>
  );
});
