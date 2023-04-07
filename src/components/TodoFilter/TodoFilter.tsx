import { FC } from 'react';
import { Status } from '../../types/Status';

type Props = {
  status: Status,
  onHandleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  query: string;
  onHandleInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onClear: () => void,
};

export const TodoFilter: FC<Props> = ({
  status,
  onHandleSelect,
  query,
  onHandleInput,
  onClear,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={onHandleSelect}
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
          onChange={onHandleInput}
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
              onClick={onClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
