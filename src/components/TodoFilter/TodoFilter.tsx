import { Status } from '../../types/Status';

interface Props {
  onStatusChange: (e: Status) => void;
  query: string;
  status: Status;
  onInputChange: (e: string) => void;
  handleInputReset: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  onStatusChange,
  query,
  status,
  onInputChange,
  handleInputReset,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event =>
            onStatusChange(event.target.value as 'all' | 'active' | 'completed')
          }
          value={status}
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
        value={query}
        className="input"
        placeholder="Search..."
        onChange={event => {
          onInputChange(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleInputReset}
          />
        )}
      </span>
    </p>
  </form>
);
