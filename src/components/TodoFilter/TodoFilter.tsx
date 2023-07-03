import { FC } from 'react';
import { TodoStatusOptions } from '../../enums/TodoStatusOptions';

interface Props {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  selectedOption: string;
  setSelectedOption: (selectedOption: string) => void;
}

export const TodoFilter: FC<Props> = ({
  searchQuery,
  setSearchQuery,
  selectedOption,
  setSelectedOption,
}) => {
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const clearSearchInput = () => {
    setSearchQuery('');
  };

  const selectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={selectOption}
          >
            <option value={TodoStatusOptions.all}>All</option>
            <option value={TodoStatusOptions.active}>Active</option>
            <option value={TodoStatusOptions.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={searchQuery}
          onChange={handleChangeSearch}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear search"
              onClick={clearSearchInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
