import { FC, ChangeEvent } from 'react';
import { StatusSelector } from '../../types/StatusSelector';

interface Props {
  searchQuery: string;
  onSearch: (searchInput: string) => void;
  onSelectStatus(StatusSelector: StatusSelector): void;
}
export const TodoFilter: FC<Props> = ({
  searchQuery,
  onSearch,
  onSelectStatus,
}) => {
  const handlePreventDefault = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSelectStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelectStatus(event.target.value as StatusSelector);
  };

  const handleSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleClearSearch = () => {
    onSearch('');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={handlePreventDefault}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectStatus}
          >
            <option value={StatusSelector.ALL}>All</option>
            <option value={StatusSelector.ACTIVE}>Active</option>
            <option value={StatusSelector.COMPLETED}>Completed</option>
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
          onChange={handleSearchQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchQuery && (
            <button
              aria-label="clearSearch"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
