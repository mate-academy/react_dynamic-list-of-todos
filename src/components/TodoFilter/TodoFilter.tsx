import React, { useState } from 'react';
import { FilterCompleted } from '../../types/FilterCompleted';

type Props = {
  onSelect: (value: FilterCompleted) => void;
  onChange: (newQuery: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ onSelect, onChange }) => {
  // #region select
  const [selectValue, setSelectValue] = useState('');

  const handleSelectValueChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = event.target.value;

    switch (newValue) {
      case FilterCompleted.Active:
        onSelect(FilterCompleted.Active);
        break;

      case FilterCompleted.Completed:
        onSelect(FilterCompleted.Completed);
        break;

      case FilterCompleted.All:
      default:
        onSelect(FilterCompleted.All);
    }

    setSelectValue(newValue);
  };
  // #endregion

  // #region query
  const [query, setQuery] = useState('');

  const handleQuaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onChange(event.target.value);
  };

  const handleDeleteBtnClick = () => {
    setQuery('');
    onChange('');
  };
  // #endregion

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={handleSelectValueChange}
          >
            <option value={FilterCompleted.All}>All</option>
            <option value={FilterCompleted.Active}>Active</option>
            <option value={FilterCompleted.Completed}>Completed</option>
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
          onChange={handleQuaryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteBtnClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
