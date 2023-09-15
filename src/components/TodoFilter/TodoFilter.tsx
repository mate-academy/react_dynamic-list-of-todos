import React, { useState } from 'react';

type Props = {
  handleQuery: (value: string) => void;
  handleOption: (value: boolean | null) => void;
};

export const TodoFilter: React.FC<Props> = ({ handleQuery, handleOption }) => {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleQueryValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setQuery(newValue);
    handleQuery(newValue);
  };

  const handleClearQuery = () => {
    setQuery('');
    handleQuery('');
  };

  const handleOptions = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;

    setSelectedOption(newOption);

    let booleanOption: boolean | null = null;

    switch (newOption) {
      case 'all':
        booleanOption = null;
        break;
      case 'active':
        booleanOption = false;
        break;
      case 'completed':
        booleanOption = true;
        break;
      default:
        booleanOption = null;
    }

    handleOption(booleanOption);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption || ''}
            onChange={handleOptions}
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
          onChange={handleQueryValue}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        <span className="icon is-right">
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
              aria-label="Clear search"
            />
          )}
        </span>
      </p>
    </form>
  );
};
