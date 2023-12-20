import React from 'react';

type Props = {
  setNewQuery(newQuery: string): void;
  setNewFilter(newFilter: string): void;
  query: string;
  filter: string;
};

export const TodoFilter: React.FC<Props> = ({
  setNewQuery,
  setNewFilter,
  query,
  filter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={filter}
          data-cy="statusSelect"
          onChange={event => setNewFilter(event.target.value)}
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
        onChange={event => setNewQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query
       && (
         <span className="icon is-right" style={{ pointerEvents: 'all' }}>
           {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
           <button
             data-cy="clearSearchButton"
             type="button"
             className="delete"
             onClick={() => setNewQuery('')}
           />
         </span>
       )}
    </p>
  </form>
);
