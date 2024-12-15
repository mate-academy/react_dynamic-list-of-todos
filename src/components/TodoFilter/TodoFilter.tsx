import { Dispatch, SetStateAction } from 'react';
import { Filters } from '../../types/Filters';

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  status: Filters;
  setStatus: Dispatch<SetStateAction<Filters>>;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  status,
  setStatus,
}) => {
  const isQueryNotEmpty = query.trim();

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event => setStatus(event.target.value as Filters)}
          >
            <option value={Filters.All}>All</option>
            <option value={Filters.Active}>Active</option>
            <option value={Filters.Completed}>Completed</option>
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
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {isQueryNotEmpty && (
          <span className="icon is-right is-clickable">
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
