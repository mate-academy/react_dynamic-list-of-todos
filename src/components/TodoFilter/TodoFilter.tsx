import { Sort } from '../../types/Sort';

type Props = {
  setQuery: (value: string) => void,
  query: string,
  setStatusFilter:(value: Sort) => void
};

export const TodoFilter: React.FC<Props> = (

  { setQuery, query, setStatusFilter },
) => {
  const sort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value: Sort;

    switch (event.target.value) {
      case 'active':
        value = Sort.active;
        break;
      case 'completed':
        value = Sort.completed;
        break;
      default:
        value = Sort.all;
    }

    setStatusFilter(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={sort}
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
          onChange={(event) => setQuery(event.target.value)}
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
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
