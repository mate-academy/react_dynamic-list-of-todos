import { FC, memo } from 'react';
import { FilterTypeEnum } from '../../types/filterType';

interface Props {
  filterType: FilterTypeEnum,
  query: string,
  onFilter: React.Dispatch<React.SetStateAction<FilterTypeEnum>>,
  onSearch: (queryToApply: string) => void,
  onClean: () => void,
}

export const TodoFilter: FC<Props> = memo(
  ({
    filterType,
    onFilter,
    query,
    onSearch,
    onClean,
  }) => {
    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const { value } = event.currentTarget;

      switch (value) {
        case FilterTypeEnum.all:
          onFilter(FilterTypeEnum.all);
          break;
        case FilterTypeEnum.active:
          onFilter(FilterTypeEnum.active);
          break;
        case FilterTypeEnum.completed:
          onFilter(FilterTypeEnum.completed);
          break;
        default:
          break;
      }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(event.currentTarget.value);
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={filterType}
              onChange={handleSelectChange}
            >
              <option value={FilterTypeEnum.all}>All</option>
              <option value={FilterTypeEnum.active}>Active</option>
              <option value={FilterTypeEnum.completed}>Completed</option>
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
            onChange={handleSearch}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {
              query && (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <button
                  data-cy="clearSearchButton"
                  type="button"
                  className="delete"
                  onClick={onClean}
                />
              )
            }
          </span>
        </p>
      </form>
    );
  },
);
