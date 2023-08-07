/* eslint-disable jsx-a11y/control-has-associated-label */
import { Status } from '../../types/Status';

type Props = {
  query: string;
  status: Status;
  onChangeQuery: (v: string) => void;
  onSelectedStatus: (v: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  onChangeQuery,
  onSelectedStatus,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectedStatus(event.target.value as Status);
  };

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeQuery(event.target.value as string);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={status}
            data-cy="statusSelect"
            onChange={handleStatusChange}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
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
          onChange={handleInputSearch}
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
              onClick={() => onChangeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
