import { useState } from 'react';

type TodoFilterProps = {
  onFilter: (status: string) => void,
  onTitleFilter: (title: string) => void,
  onClearFilter: () => void,
};

export const TodoFilter
  = ({ onFilter, onTitleFilter, onClearFilter } : TodoFilterProps) => {
    const [query, setQuery] = useState<string>('');
    const [filter, setFilter] = useState<string>('all');

    const handleSelect: React.ChangeEventHandler<HTMLSelectElement>
  = (event) => {
    setFilter(event.target.value);
    onFilter(event.target.value);
  };

    const handleInput: React.ChangeEventHandler<HTMLInputElement>
  = (event) => {
    setQuery(event.target.value);
    onTitleFilter(event.target.value);
  };

    const handleClearing = () => {
      setFilter('all');
      setQuery('');
      onClearFilter();
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={filter}
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
            onChange={handleInput}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            {query && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleClearing}
                aria-label="Clear search"
              />
            )}
          </span>
        </p>
      </form>
    );
  };
