import React from 'react';
import { SelectorOption } from '../../enum';

type Props = {
  setCurrentSelector: (value: string) => void;
  setSearchQuery: (value: string) => void;
  searchQuery: string;
};

export const TodoFilter: React.FC<Props> = ({
  setCurrentSelector,
  setSearchQuery,
  searchQuery,
}) => {
  const handlerSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSelector(event.target.value);
  };

  const handlerSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchQuery(value);
  };

  const handlerClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handlerSelector}
          >
            <option value={SelectorOption.All}>All</option>
            <option value={SelectorOption.Active}>Active</option>
            <option value={SelectorOption.Completed}>Completed</option>
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
          onChange={handlerSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handlerClearSearch}
              aria-label="cleanSearchQuery"
            />
          </span>
        )}
      </p>
    </form>
  );
};
