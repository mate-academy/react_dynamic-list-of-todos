import { useState } from 'react';

type Props = {
  getFilters: (filterValue: string, filterBy: 'title' | 'status') => void;
};

export const TodoFilter: React.FC<Props> = ({ getFilters }) => {
  const [status, setStatus] = useState<string>('all');
  const [query, setQuery] = useState('');

  const handlerStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    getFilters(event.target.value, 'status');
  };

  const handlerQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    getFilters(event.target.value, 'title');
  };

  const handlerClearButton = () => {
    setQuery('');
    getFilters('', 'title');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={status}
            onChange={handlerStatus}
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
          data-cy="searchInput"
          type="text"
          className="input"
          value={query}
          onChange={handlerQuery}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handlerClearButton}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
