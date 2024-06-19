import { ChangeEvent, useState } from 'react';

type Props = {
  onSelect: (status: string) => void;
  onQueryChange: (query: string) => void;
};

enum Status {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const TodoFilter: React.FC<Props> = ({ onSelect, onQueryChange }) => {
  const [query, setQuery] = useState('');

  const handleTodoStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
    setQuery(event.target.value);
  };

  const handleClearButton = () => {
    onQueryChange('');
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleTodoStatus}>
            {Object.entries(Status).map(([key, value]) => (
              <option value={key} key={key}>
                {value}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
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
