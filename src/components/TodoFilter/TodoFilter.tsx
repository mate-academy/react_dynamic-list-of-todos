import React, { useState } from 'react';

type FilterParams = {
  category: string;
  input: string;
};

type Props = {
  onFiltersChange: ({ category, input }: FilterParams) => void;
};

export const TodoFilter: React.FC<Props> = ({ onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState({
    category: '',
    input: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const updated = {
      ...localFilters,
      [name]: value,
    };

    setLocalFilters(updated);
    onFiltersChange(updated);
  };

  const remove = () => {
    setLocalFilters({
      ...localFilters,
      input: '',
    });

    onFiltersChange({
      ...localFilters,
      input: '',
    });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            name="category"
            data-cy="statusSelect"
            value={localFilters.category}
            onChange={handleChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          name="input"
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={localFilters.input}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {localFilters.input && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={remove}
            />
          </span>
        )}
      </p>
    </form>
  );
};
