import { ChangeEvent, useCallback } from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  filter: string,
  setFilter: (filter: Filter) => void,
  query: string,
  setQuery: (query: string) => void,
  applyQuery: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  setFilter,
  filter,
  query,
  setQuery,
  applyQuery,
}) => {
  const handleSelectChange = useCallback(
    ({ target }: ChangeEvent<HTMLSelectElement>) => {
      setFilter(target.value as Filter);
    }, [],
  );

  const onInputChangeHandler = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setQuery(target.value);
      applyQuery(target.value);
    }, [],
  );

  const handleClick = useCallback(
    () => {
      setQuery('');
      applyQuery('');
    }, [],
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleSelectChange}
          >
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
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
          onChange={onInputChangeHandler}
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
              onClick={handleClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
