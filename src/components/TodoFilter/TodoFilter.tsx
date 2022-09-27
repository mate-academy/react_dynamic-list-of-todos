import React, { useEffect, useState } from 'react';

type Props = {
  filterTodos: (query: string, groupBy: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ filterTodos }) => {
  const [query, setQuery] = useState('');
  const [groupBy, setGroupBy] = useState('all');

  useEffect(() => {
    filterTodos(groupBy, query);
  }, [query, groupBy]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLInputElement>) => {
    const { value, localName } = event.target;

    if (localName === 'input') {
      setQuery(value);
    }

    if (localName === 'select') {
      setGroupBy(value);
    }
  };

  const resetQuery = () => {
    setQuery('');
  };

  return (
    <form
      className="field has-addons"
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChange}
            value={groupBy}
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
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.trim().length > 0 ? (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQuery}
            />
          </span>
        ) : ''}
      </p>
    </form>
  );
};
