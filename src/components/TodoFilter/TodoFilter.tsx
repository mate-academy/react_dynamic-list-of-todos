import React, { useEffect, useState } from 'react';
import { Filter } from '../../types/Filter';
import { TodosFilters } from '../../types/TodosFilters';

type Props = {
  handleFilter: (filter: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({ handleFilter }) => {
  const [query, setQuery] = useState('');
  const [option, setOption] = useState<TodosFilters>(TodosFilters.All);

  useEffect(() => {
    handleFilter({ option, query });
  }, [query, option]);

  const handleChangeFilterOption
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value as TodosFilters);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleDeleteQuery = () => {
    setQuery('');
    setOption(TodosFilters.All);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={option}
            onChange={handleChangeFilterOption}
          >
            <option value={TodosFilters.All}>All</option>
            <option value={TodosFilters.Active}>Active</option>
            <option value={TodosFilters.Completed}>Completed</option>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {Boolean(query)
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleDeleteQuery}
              />
            </span>
          )}
      </p>
    </form>
  );
};
