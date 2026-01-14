import React, { useState } from 'react';

type Props = {
  onChangeStatus: (status: 'all' | 'active' | 'completed') => void;
  onSearch: (query: string) => void;
};
export const TodoFilter: React.FC<Props> = ({
  onChangeStatus = () => {},
  onSearch = () => {},
}) => {
  const [choiceValue, setChoiceValue] = useState<
  'all' | 'active' | 'completed'
  >('all');
  const [query, setQuery] = useState('');

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as 'all' | 'active' | 'completed';

    setChoiceValue(value);
    onChangeStatus(value);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);
    onSearch(value);
  };

  const cleanSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={choiceValue}
            data-cy="statusSelect"
            onChange={handleStatus}
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={cleanSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
