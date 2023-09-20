import React from 'react';
import { StatusState } from '../../types/StatusState';

type Props = {
  statusState: StatusState;
  setStatusState: (status: StatusState) => void;
  titleQuery: string;
  setTitleQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  statusState,
  setStatusState,
  titleQuery,
  setTitleQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={statusState}
          onChange={(event) => {
            setStatusState(event.target.value as StatusState);
          }}
        >
          <option value={StatusState.All}>All</option>
          <option value={StatusState.Active}>Active</option>
          <option value={StatusState.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        value={titleQuery}
        onChange={(event) => {
          setTitleQuery(event.target.value);
        }}
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {titleQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              setTitleQuery('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
