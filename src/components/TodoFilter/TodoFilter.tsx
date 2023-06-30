import { FC, ChangeEvent, useState } from 'react';
import { FilterType } from '../../types/helperType';

type Props = {
  setFilterType: (type: FilterType) => void;
  applyQuery: (value: string) => void;
  setIsLoading: (value: boolean) => void;
};

export const TodoFilter: FC<Props> = ({
  setFilterType,
  applyQuery,
  setIsLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleFilterType = (event: ChangeEvent<HTMLSelectElement>): void => {
    setFilterType(event.target.value as FilterType);
  };

  const handleSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearchQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const clearSearchQuary = () => {
    setSearchQuery('');
    applyQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterType}
          >
            <option value={FilterType.ALL}>All</option>
            <option value={FilterType.ACTIVE}>Active</option>
            <option value={FilterType.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearchQuary}
            />
          </span>
        )}

      </p>
    </form>
  );
};
