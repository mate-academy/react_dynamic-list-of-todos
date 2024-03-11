import React from 'react';
import { State } from '../../types/enumState';

type Props = {
  setMode: (e: string) => void;
  setSearch: (event: string) => void;
  search: string;
};

export const TodoFilter: React.FC<Props> = ({ setMode, setSearch, search }) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => setMode(event.target.value)}
        >
          <option value={State.all}>All</option>
          <option value={State.active}>Active</option>
          <option value={State.completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        value={search}
        onChange={event => setSearch(event.target.value)}
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {search && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSearch('')}
          />
        )}
      </span>
    </p>
  </form>
);
