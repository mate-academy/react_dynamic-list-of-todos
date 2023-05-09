import React from 'react';

interface TodoFilterProps {
  query: string;
  changeInput: (query: string) => void;
  selectedOption: string;
  changeOption: (option: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  changeInput,
  selectedOption,
  changeOption,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeInput(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeOption(event.target.value);
  };

  const handleButtonReset = () => {
    changeInput('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={handleSelect}
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
          onChange={handleSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleButtonReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
