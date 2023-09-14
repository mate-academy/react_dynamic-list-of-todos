import { Status } from '../../types/Status';

type Props = {
  status: Status;
  setStatus: (value: Status) => void;
  setQuery: (value: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  setStatus,
  setQuery,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          defaultValue={status}
          onChange={event => setStatus(event.target.value as Status)}
        >
          <option value={Status.all}>{Status.all}</option>
          <option value={Status.active}>{Status.active}</option>
          <option value={Status.completed}>{Status.completed}</option>
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
        onChange={e => setQuery(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>

          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="Delete"
            onClick={() => setQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
