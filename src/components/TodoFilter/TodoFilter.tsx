import { TodoFilterBy } from '../../types/Todo';

type Props = {
  setFilter:(newFilter: TodoFilterBy) => void,
  setQuery:(query: string) => void,
  filter: string,
  query: string,
};

export const TodoFilter: React.FC<Props> = ({
  setFilter, setQuery, filter, query,
}) => {
  const reset = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={
              ({ target }) => setFilter(target.value as TodoFilterBy)
            }
          >
            <option value={TodoFilterBy.NONE}>All</option>
            <option value={TodoFilterBy.ACTIVE}>Active</option>
            <option value={TodoFilterBy.COMPLETED}>
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={reset}
          />
        </span>
      </p>
    </form>
  );
};
