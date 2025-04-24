import { useState } from 'react';

type Props = {
  setFilter: (filter: string) => void;
  setQuery: (word: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ setFilter, setQuery }) => {
  const [sortBy, setSortBy] = useState('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => {
              switch (e.target.value) {
                case 'all':
                  setFilter('all');
                  break;
                case 'active':
                  setFilter('active');
                  break;
                case 'completed':
                  setFilter('completed');
                  break;
              }
            }}
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
          value={sortBy}
          onChange={event => {
            setSortBy(event.target.value);
            setQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {sortBy && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSortBy('');
                setQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
