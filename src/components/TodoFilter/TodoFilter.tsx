import { useState } from 'react';

interface PropsTodoFilter {
  handleSelect(e: string): void;
  searchQuery(word: string) : void;
}

export const TodoFilter = ({ handleSelect, searchQuery }: PropsTodoFilter) => {
  const [inputValue, setInputValue] = useState('');

  const handleQuery = (word: string) => {
    searchQuery(word);
    setInputValue(word);
  };

  const handleResetInput = () => {
    searchQuery('');
    setInputValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => handleSelect(event.target.value)}
          >
            <option value="all" selected>All</option>
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
          onChange={(e) => handleQuery(e.target.value)}
          value={inputValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputValue && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleResetInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
