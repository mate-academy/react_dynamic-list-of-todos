import { useState } from 'react';

type Props = {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  onStatus: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter: React.FC<Props> = ({ onSearch, onStatus }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={event => onStatus(event.target.value)}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={event => {
            setSearchQuery(event.target.value);
            onSearch(event.target.value);
          }}
          value={searchQuery}
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
          {searchQuery !== '' && (
            <button
              data-cy="clearSearchButton"
              onClick={() => {
                setSearchQuery('');
                onSearch('');
              }}
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
