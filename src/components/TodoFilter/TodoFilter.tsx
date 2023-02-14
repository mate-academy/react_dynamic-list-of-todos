import React, { useState, Dispatch, SetStateAction } from 'react';

type Props = {
  selectOption: (arg: string) => void,
  applyQuery: (value: string) => void
  setAppliedQuery: Dispatch<SetStateAction<string>>
};

export const TodoFilter: React.FC<Props> = React.memo(
  ({
    selectOption,
    applyQuery,
    setAppliedQuery,
  }) => {
    const [query, setQuery] = useState('');

    const deleteQuery = () => {
      setQuery('');
      setAppliedQuery('');
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={(event) => selectOption(event.target.value)}
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
            onChange={(event) => {
              setQuery(event.target.value);
              applyQuery(event.target.value);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          { query
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={deleteQuery}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);
