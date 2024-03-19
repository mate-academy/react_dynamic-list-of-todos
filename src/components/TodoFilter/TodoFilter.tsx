import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type FilterOptions = 'all' | 'active' | 'completed';
type FilterConfig = {
  query: string;
  filterOption: FilterOptions;
};

function createFilterFn(config: FilterConfig) {
  const { filterOption, query } = config;

  return (value: Todo): boolean => {
    if (!value.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    switch (filterOption) {
      case 'active':
        return !value.completed;

      case 'completed':
        return value.completed;

      case 'all':
      default:
        return true;
    }
  };
}

type Props = {
  todos: Todo[];
  onFilter: (todo: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ onFilter, todos }) => {
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    filterOption: 'all',
    query: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, name } = event.target;

    setFilterConfig(prevFilterConfig => ({
      ...prevFilterConfig,
      [name]: value,
    }));
  };

  useEffect(() => {
    onFilter(todos.filter(createFilterFn(filterConfig)));
  }, [filterConfig, todos, onFilter]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            name="filterOption"
            data-cy="statusSelect"
            value={filterConfig.filterOption}
            onChange={handleChange}
          >
            <option value={'all'}>All</option>
            <option value={'active'}>Active</option>
            <option value={'completed'}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          name="query"
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterConfig.query}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {Boolean(filterConfig.query) && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() =>
                setFilterConfig(prevConfig => ({ ...prevConfig, query: '' }))
              }
            />
          )}
        </span>
      </p>
    </form>
  );
};
