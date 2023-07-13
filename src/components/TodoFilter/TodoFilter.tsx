import { ChangeEvent, useEffect, useState } from 'react';
import { useTodoContext } from '../../hooks/useTodoContext';

enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter = () => {
  const { filterTodosByField } = useTodoContext();
  const [filterQuery, setFilterQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case FilterStatus.Active:
        setFilterStatus(FilterStatus.Active);
        break;
      case FilterStatus.Completed:
        setFilterStatus(FilterStatus.Completed);
        break;
      default:
        setFilterStatus(FilterStatus.All);
        break;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(event.target.value);
  };

  useEffect(() => {
    filterTodosByField({
      query: filterQuery,
      status: filterStatus,
    });
  }, [filterQuery, filterStatus]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
            value={filterStatus}
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
          value={filterQuery}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterQuery && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setFilterQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
