import { useContext } from 'react';
import { FilterContext, Status } from '../../Store';

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({ query, onQueryChange }) => {
  const { filter, setFilter } = useContext(FilterContext);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filter}
            data-cy="statusSelect"
            onChange={(event) => setFilter(event.target.value as Status)}
          >
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
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
