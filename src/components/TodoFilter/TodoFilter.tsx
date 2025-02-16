import React, { useState } from 'react';

type SelectComponentProps = {
  handleSelectChange: (value: string) => void;
  query: string;
  handleQueryChange: (value: string) => void;
  clearQuery: () => void;
};

export const TodoFilter: React.FC<SelectComponentProps> = ({
  handleSelectChange,
  query,
  handleQueryChange,
  clearQuery,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('all');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSelectedValue(value);
    handleSelectChange(value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleQueryChange(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedValue}
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

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
            onClick={clearQuery}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
