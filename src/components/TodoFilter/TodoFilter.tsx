import { FC, memo } from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  selectedFilter: FilterType,
  titleFilter: string,
  onSelectedFilterChange: (selectedFilterType: FilterType) => void
  onTitleFilterChange: (titlePart: string) => void
};

export const TodoFilter: FC<Props> = memo(({
  selectedFilter,
  titleFilter,
  onSelectedFilterChange,
  onTitleFilterChange,
}) => {
  const options = Object.entries(FilterType);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={(event) => {
              onSelectedFilterChange(event.target.value as FilterType);
            }}
          >
            {options.map(([key, value]) => {
              const optionLabel = value[0].toUpperCase() + value.slice(1);

              return (
                <option key={key} value={value}>
                  {optionLabel}
                </option>
              );
            })}

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
          onChange={(event) => onTitleFilterChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {titleFilter && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onTitleFilterChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
});
