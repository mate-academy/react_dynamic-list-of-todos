import React, { useState } from 'react';

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type Props = {
  onInputChange: (value: string) => void;
  onFilterSelect: (value: Filter | string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  onInputChange,
  onFilterSelect,
}) => {
  const [currentFilter, setCurrentFilter]
    = useState<Filter | string>(Filter.ALL);
  const [inputValue, setInputValue] = useState('');

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    setCurrentFilter(value);
    onFilterSelect(value);
  };

  const onQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
    setInputValue(event.target.value);
  };

  const onQueryRemove = () => {
    onInputChange('');
    setInputValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={currentFilter}
            onChange={onSelect}
          >
            <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLETED}>Completed</option>
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
          onChange={onQueryInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="delete"
              onClick={onQueryRemove}
            />
          )}
        </span>
      </p>
    </form>
  );
};
