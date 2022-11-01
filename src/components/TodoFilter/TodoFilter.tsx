import { Status } from '../../types/Status';

interface Props {
  status: Status;
  selectStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  query: string;
  getQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetQuery: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  status,
  selectStatus,
  query,
  getQuery,
  resetQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={selectStatus}
        >
          <option value="all">
            All
          </option>
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
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
        onChange={getQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            aria-label="label"
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={resetQuery}
          />
        )}
      </span>
    </p>
  </form>
);
