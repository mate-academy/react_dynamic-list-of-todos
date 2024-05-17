import { useState } from 'react';
import { TodoFilterOptions } from '../../types/Todo';

type Props = {
  handleFilterTodos: (filter: TodoFilterOptions) => void;
  filterTodos: TodoFilterOptions;
};
export const TodoFilter: React.FC<Props> = ({
  handleFilterTodos,
  filterTodos,
}) => {
  const [selectValue, setSelectValue] = useState('all');

  const onQueryFilter = (selectFilter: string, newQuery = '') => {
    const filters = {
      query: newQuery,
      select: selectFilter,
    };

    handleFilterTodos(filters);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    onQueryFilter(e.target.value, filterTodos.query);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={selectValue}
            data-cy="statusSelect"
            onChange={e => handleSelect(e)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={e => onQueryFilter(selectValue, e.target.value)}
          value={filterTodos.query}
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
          {filterTodos.query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryFilter(selectValue, '')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
