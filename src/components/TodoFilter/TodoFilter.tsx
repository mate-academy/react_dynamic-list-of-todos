import React, {
  Dispatch,
  SetStateAction,
} from 'react';
import { FilterBy } from '../../utils/enums';

type Props = {
  onFilterChange: Dispatch<SetStateAction<FilterBy>>;
  onQueryChange: Dispatch<SetStateAction<string>>;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterChange,
  onQueryChange,
  query,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilterBy = event.target.value as FilterBy;

    onFilterChange(newFilterBy);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
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
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>

          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
