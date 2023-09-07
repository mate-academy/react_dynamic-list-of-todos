import { ChangeEvent } from 'react';
import { FILTER } from '../../types/filterTypes';

type Props = {
  setFilterType: (filter: string) => void,
  searchField: string,
  setSearchField: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  setFilterType,
  searchField,
  setSearchField,
}) => {
  const onFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const onSearchFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  const clearInput = () => {
    setSearchField('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={onFilterChange}>
            <option value={FILTER.ALL}>All</option>
            <option value={FILTER.ACTIVE}>Active</option>
            <option value={FILTER.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={onSearchFieldChange}
          value={searchField}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearInput}
          />
        </span>
      </p>
    </form>
  );
};
