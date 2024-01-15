import { Dispatch, SetStateAction } from 'react';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  setFilterBy: Dispatch<SetStateAction<FilterBy>>,
  handleFilterInput: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export const TodoFilter: React.FC<Props> = ({
  setFilterBy,
  handleFilterInput,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as FilterBy;

    setFilterBy(selectedFilter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
            <option value={FilterBy.All}>All</option>
            <option value={FilterBy.Active}>Active</option>
            <option value={FilterBy.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleFilterInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
