import { useState } from 'react';
import { Filter } from '../../types/EnumFilter';
import { FiltersType } from '../../types/Filter';

type Props = {
  getChangeFilters: (filter: FiltersType) => void;
  filters: FiltersType;
};

export const TodoFilter: React.FC<Props> = ({ getChangeFilters, filters }) => {
  const [clearInput, setClearInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleFiltersChange = (optionValue: Filter, inputQuery: string) => {
    setInputValue(inputQuery);
    setClearInput(true);
    getChangeFilters({
      option: optionValue as Filter,
      filteredQuery: inputQuery,
    });

    if (inputQuery === '') {
      setClearInput(false);
    }
  };

  const handleClearFilters = () => {
    setInputValue('');
    getChangeFilters({
      option: filters.option as Filter,
      filteredQuery: '',
    });
    setClearInput(false);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e =>
              handleFiltersChange(e.target.value as Filter, inputValue)
            }
          >
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputValue}
          onChange={e => handleFiltersChange(filters.option, e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {clearInput && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearFilters}
            />
          )}
        </span>
      </p>
    </form>
  );
};
