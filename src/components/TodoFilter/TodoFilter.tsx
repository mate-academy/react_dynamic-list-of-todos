import { useState } from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  filterChange: (newFilter: FilterType) => void;
  searchChange: (text: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ filterChange, searchChange }) => {
  const [search, setSearch] = useState('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;

    setSearch(newSearch);
    searchChange(newSearch);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              filterChange(event.target.value as FilterType)
            }
          >
            <option value={FilterType.All}>{FilterType.All}</option>
            <option value={FilterType.Active}>{FilterType.Active}</option>
            <option value={FilterType.Completed}>{FilterType.Completed}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearch('');
                searchChange('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
