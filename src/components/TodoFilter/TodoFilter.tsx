import { FC } from 'react';
// import { Todo } from '../../types/Todo';

type Props = {
  // todos: Todo[];
  completeStatus: string;
  setCompleteStatus: (status: string) => void;
  filterText: string;
  setFilterText: (text: string) => void;
};

export const TodoFilter: FC<Props> = ({
  completeStatus,
  setCompleteStatus,
  filterText,
  setFilterText,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={completeStatus}
            onChange={(event) => setCompleteStatus(event.target.value)}
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
          value={filterText}
          onChange={(event) => setFilterText(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {filterText !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear search query"
              onClick={() => setFilterText('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
