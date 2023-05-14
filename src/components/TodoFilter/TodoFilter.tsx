import { FC } from 'react';
import { Statuses } from '../../types/Statuses';

interface Props {
  searchedQuery: string;
  setSearchedQuery: (value: string) => void;
  selectedStatusOfTodo: Statuses;
  setSelectedStatusOfTodo: (value: Statuses) => void;
}

export const TodoFilter: FC<Props> = ({
  searchedQuery,
  setSearchedQuery,
  selectedStatusOfTodo,
  setSelectedStatusOfTodo,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatusOfTodo}
            onChange={(event) => {
              setSelectedStatusOfTodo(Number(event.target.value));
            }}
          >
            <option value={Statuses.All}>All</option>
            <option value={Statuses.Active}>Active</option>
            <option value={Statuses.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchedQuery}
          onChange={(event) => setSearchedQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchedQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchedQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
