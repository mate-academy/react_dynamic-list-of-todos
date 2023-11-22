import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  query: { filter: Filter, input: string },
  onFilterChange: (f: Filter) => void;
  onInputChange: (i: string) => void;
  onInputClear: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onFilterChange,
  onInputChange,
  onInputClear,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'all':
        // eslint-disable-next-line react-hooks/rules-of-hooks
        onFilterChange(Filter.ALL);
        break;
      case 'active':
        // eslint-disable-next-line react-hooks/rules-of-hooks
        onFilterChange(Filter.ACTIVE);
        break;
      case 'completed':
        // eslint-disable-next-line react-hooks/rules-of-hooks
        onFilterChange(Filter.COMPLETED);
        break;
      default:
        // eslint-disable-next-line react-hooks/rules-of-hooks
        onFilterChange(Filter.ALL);
        break;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    onInputChange(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={query.filter}
            onChange={handleFilterChange}
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
          value={query.input}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.input && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onInputClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
