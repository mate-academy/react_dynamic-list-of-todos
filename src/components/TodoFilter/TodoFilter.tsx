import { Status } from '../../types/Status';

type Props = {
  query: string;
  onSetQuery: (value: string) => void;
  onSetStatus: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onSetQuery,
  onSetStatus,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => onSetStatus(event.target.value)}
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
        onChange={event => onSetQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSetQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
