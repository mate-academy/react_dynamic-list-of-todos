import { FC } from 'react';

import { TodoStatus } from '../../enums/TodoStatus';

import { getTodoStatus } from '../../helpers/getSortedType';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  status: TodoStatus;
  onStatusChange: (status: TodoStatus) => void;
};

export const TodoFilter: FC<Props> = ({
  query,
  status,
  onQueryChange,
  onStatusChange,
}) => {
  return (
    <div className="container">
      <form className="field has-addons">
        <p className="control">
          <span className="select is-info">
            <select
              data-cy="statusSelect"
              value={status}
              onChange={
                (event) => onStatusChange(getTodoStatus(event.target.value))
              }
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
            className="input is-info"
            placeholder="Search..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {query !== '' && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete is-info"
                onClick={() => onQueryChange('')}
                aria-label="clearSearchButton"
              />
            </span>
          )}
        </p>
      </form>
    </div>
  );
};
