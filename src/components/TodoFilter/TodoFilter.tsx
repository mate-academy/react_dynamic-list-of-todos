import { useState } from 'react';
import { Status } from '../../types/Status';

type TodoFilterProps = {
  onFilter: (status: Status) => void,
  onTitleFilter: (title: string) => void,
  onClearFilter: () => void,
};

export const TodoFilter
= ({ onFilter, onTitleFilter, onClearFilter } : TodoFilterProps) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Status.all);
  const handleSelect: React.ChangeEventHandler<HTMLSelectElement>
    = (event) => {
      setFilter(event.target.value as Status);
      onFilter(event.target.value as Status);
    };

  const handleSearchInput: React.ChangeEventHandler<HTMLInputElement>
    = (event) => {
      setQuery(event.target.value);
      onTitleFilter(event.target.value);
    };

  const handleClearButton = () => {
    setFilter(Status.all);
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
            <option value={Status.all}>All</option>
            <option value={Status.active}>Active</option>
            <option value={Status.completed}>Completed</option>
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
          onChange={handleSearchInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearButton}
            />
          </span>
        )}
      </p>
    </form>
  );
};
