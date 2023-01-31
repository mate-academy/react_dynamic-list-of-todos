import { memo } from 'react';

interface Props {
  onSelectFilter: (status: string) => void;
  filter: string;
  onFilter: (value: string) => void;
  query: string;
}

export const TodoFilter: React.FC<Props> = memo(({
  onSelectFilter,
  filter,
  onFilter,
  query,
}) => {
  const handleChangeFilterQuery = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => onFilter(event.target.value);

  const handleChangeStatus = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => onSelectFilter(event.target.value);

  const handleClickResetFilter = () => onFilter('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleChangeStatus}
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
          onChange={handleChangeFilterQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClickResetFilter}
            />
          </span>
        )}
      </p>
    </form>
  );
});
