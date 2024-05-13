import { Dispatch, SetStateAction } from 'react';
import { Status } from '../../types/Status';

interface PropsFilter {
  titles: string;
  setTitles: Dispatch<SetStateAction<string>>;
  handleFilterChange: (selectedFilter: Status) => void;
}

export const TodoFilter: React.FC<PropsFilter> = ({
  titles,
  setTitles,
  handleFilterChange,
}) => {
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();

    event.preventDefault();
    setTitles(searchText);
  };

  const clearFilter = () => {
    setTitles('');
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value as Status;

    handleFilterChange(selectedStatus);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={titles}
          onChange={handleTitle}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {titles && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearFilter}
            />
          </span>
        )}
      </p>
    </form>
  );
};
