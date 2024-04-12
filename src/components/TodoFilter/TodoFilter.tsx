import { ChangeEventHandler, FC } from 'react';
export type FilterType = 'all' | 'active' | 'completed';
type Props = {
  query: string;
  onChange: (input: string) => void;
  onFilterChange: (type: FilterType) => void;
};
export const TodoFilter: FC<Props> = ({ query, onChange, onFilterChange }) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange(e.target.value);
  };

  const handleClearInput = () => {
    onChange('');
  };

  const handleFilterChange: ChangeEventHandler<HTMLSelectElement> = e => {
    const selectedFilter = e.target.value as FilterType;

    onFilterChange(selectedFilter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
