import React, { memo } from 'react';

type Props = {
  titleFilter: string;
  onTitleFilterChange: (event: string) => void;
  completedFilter: string;
  onChangeFilter: (event: string) => void;
};

export const TodoFilter: React.FC<Props> = memo(({
  titleFilter,
  onTitleFilterChange,
  completedFilter,
  onChangeFilter,
}) => {
  const handleChangeFilterQuery = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onChangeFilter(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChangeFilterQuery}
            value={completedFilter}
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
          value={titleFilter}
          onChange={(event) => onTitleFilterChange(event.currentTarget.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {titleFilter && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onTitleFilterChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
});
