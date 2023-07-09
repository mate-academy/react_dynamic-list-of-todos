import { FC, ChangeEvent, memo } from 'react';
import { SelectStatus } from '../../enums/SelectStatus';

type Props = {
  status: SelectStatus;
  query: string;
  onStatusChange: (filter: SelectStatus) => void;
  onQueryChange: (newQuery: string) => void;
};

export const TodoFilter: FC<Props> = memo((props) => {
  const {
    status,
    query,
    onStatusChange,
    onQueryChange,
  } = props;

  const changeFilterOption = (event: ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value as SelectStatus);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event) => changeFilterOption(event)}
          >
            <option value={SelectStatus.All}>All</option>
            <option value={SelectStatus.Active}>Active</option>
            <option value={SelectStatus.Completed}>Completed</option>
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
});
