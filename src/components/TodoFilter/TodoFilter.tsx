import { Status } from '../../types/Status';

type Props = {
  onInput: (input: string) => void,
  changeStatus: (input: Status) => void,
  query: string,
  status: Status,
};

export const TodoFilter: React.FC<Props> = ({
  onInput,
  changeStatus,
  query,
  status,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              changeStatus(event.target.value as Status);
            }}
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onInput(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onInput('')}
            />
          )}

        </span>
      </p>
    </form>
  );
};
