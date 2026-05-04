import React from 'react';
import { StatusSelect } from '../../App';

enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  onStatusSelect?: (status: StatusSelect) => void;
  onQueryChange?: (query: string) => void;
  status: StatusSelect;
  query: string;
};

const TodoFilterBase: React.FC<Props> = ({
  onStatusSelect = () => {},
  onQueryChange = () => {},
  status,
  query,
}) => {
  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    onStatusSelect(value as StatusSelect);
  };

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onQueryChange(value);
  };

  const resetQuery = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={status}
            data-cy="statusSelect"
            onChange={handleSelectOption}
          >
            <option value={FilterType.All}>All</option>
            <option value={FilterType.Active}>Active</option>
            <option value={FilterType.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={handleChangeQuery}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              onClick={resetQuery}
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

export const TodoFilter = React.memo(TodoFilterBase);
