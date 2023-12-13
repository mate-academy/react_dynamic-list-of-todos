import { useState } from 'react';

type Props = {
  onSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  filter: string,
  onFilter: React.Dispatch<React.SetStateAction<string>>
};

export const TodoFilter: React.FC<Props> = ({
  onSearchQuery,
  filter,
  onFilter,
}) => {
  const [query, setQuery] = useState('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={event => {
              onFilter(event.target.value);
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
          value={query}
          onChange={event => {
            setQuery(event.target.value);
            onSearchQuery(event.target.value);
          }}

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
              onClick={() => {
                setQuery('');
                onSearchQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
