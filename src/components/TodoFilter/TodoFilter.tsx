import React from 'react';
import { Status } from '../../types/Status';

interface Props {
  filterQuery: string;
  setFilterQuery: React.Dispatch<React.SetStateAction<string>>;
  todoStatusToShow: Status;
  setTodoStatusToShow: React.Dispatch<React.SetStateAction<Status>>;
}

export const TodoFilter: React.FC<Props> = ({
  filterQuery,
  setFilterQuery,
  todoStatusToShow,
  setTodoStatusToShow,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={todoStatusToShow}
          onChange={e => {
            setTodoStatusToShow(e.target.value as Status);
          }}
          data-cy="statusSelect"
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
        value={filterQuery}
        onChange={e => setFilterQuery(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {filterQuery && (
          <button
            onClick={() => setFilterQuery('')}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        )}{' '}
      </span>
    </p>
  </form>
);
