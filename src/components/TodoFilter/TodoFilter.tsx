import { useState } from 'react';

type Props = {
  setGroupFilter: (value: string) => void;
  setFilter: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ setGroupFilter, setFilter }) => {
  const [query, setQuery] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupFilter(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setTimeout(() => {
      setFilter(event.target.value.trim());
    }, 1000);
  };

  const handleClearInput = () => {
    setQuery('');
    setFilter('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select" onChange={handleSelect}>
          <select data-cy="statusSelect">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          value={query}
          onChange={handleInputChange}
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
