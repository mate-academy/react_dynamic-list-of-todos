import React from 'react';

type Props = {
  onStatusChange: (status: string) => void;
  onQuerryChange: (querry: string) => void;
  querry: string;
};

export const TodoFilter: React.FC<Props> = ({
  onStatusChange,
  onQuerryChange,
  querry,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => onStatusChange(event.target.value)}
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
        value={querry}
        placeholder="Search..."
        onChange={event => onQuerryChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {querry.length > 0 && (
        <span className="icon is-right" /* style={{ pointerEvents: 'all' }} */>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            onClick={() => onQuerryChange('')}
            className="delete"
          />
        </span>
      )}
    </p>
  </form>
);
