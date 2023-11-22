import React from 'react';

type Props = {
  query: { filter: string, input: string },
  useFilter: (f: string) => void;
  useInput: (i: string) => void;
  clearInput: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  useFilter,
  useInput,
  clearInput,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={query.filter}
          onChange={event => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useFilter(event.target.value);
          }}
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
        value={query.input}
        onChange={event => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useInput(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query.input && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearInput}
          />
        )}
      </span>
    </p>
  </form>
);
