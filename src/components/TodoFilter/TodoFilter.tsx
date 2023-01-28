import { Dispatch, SetStateAction } from 'react';
import { FilterOption } from '../../enums/FilterOptions';

type Props = {
  filterOption: string,
  query: string,
  setFilterOption: Dispatch<SetStateAction<FilterOption>>,
  setQuery: Dispatch<SetStateAction<string>>,
};

export const TodoFilter: React.FC<Props> = ({
  filterOption, setFilterOption, setQuery, query,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filterOption}
            onChange={event => {
              setFilterOption(event.target.value as FilterOption);
            }}
            data-cy="statusSelect"
          >
            <option value={FilterOption.All}>All</option>
            <option value={FilterOption.Active}>Active</option>
            <option value={FilterOption.Completed}>Completed</option>
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
          onChange={event => {
            setQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right">
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
