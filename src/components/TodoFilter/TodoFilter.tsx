import React, { ChangeEvent } from 'react';

export enum SelectOptions {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

type TodoFilterProps = {
  selectedOption: SelectOptions;
  onSelect: (selectOption: SelectOptions) => void;
  onQueryChange: (query: string) => void;
  query: string;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  selectedOption,
  onSelect,
  onQueryChange,
  query,
}) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value as unknown as SelectOptions);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const clearQuery = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            data-cy="statusSelect"
          >
            {Object.keys(SelectOptions).map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={handleInputChange}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            onClick={clearQuery}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
