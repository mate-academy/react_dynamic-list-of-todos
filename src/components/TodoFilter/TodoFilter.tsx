import { FC, useState } from 'react';

type Props = {
  onSelection: (status: string) => void,
  onFilter: (title: string) => void,
};

export const TodoFilter: FC<Props> = ({ onSelection, onFilter }) => {
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const clearFilter = () => {
    setQuery('');
    setSelectedStatus('all');
  };

  const handleStatusSelection = (sentStatus: string) => {
    setSelectedStatus(sentStatus);

    onSelection(selectedStatus);
  };

  const handleChange = (sentQuery: string) => {
    setQuery(sentQuery);

    onFilter(query);
  };

  return (
    <form
      className="field has-addons"
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={(event) => handleStatusSelection(event.target.value)}
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
          onChange={(event) => handleChange(event.target.value)}
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
              onClick={clearFilter}
            />
          </span>
        )}
      </p>
    </form>
  );
};
