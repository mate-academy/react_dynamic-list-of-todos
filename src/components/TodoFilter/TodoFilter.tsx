import React, { useCallback } from 'react';

type Props = {
  appliedQuery: string;
  setAppliedQuery: (v: string) => void;
  setFilterField: (v: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  appliedQuery,
  setAppliedQuery,
  setFilterField,
}) => {
  const applyQuery = useCallback(
    (qwery: string) => setAppliedQuery(qwery),
    [setAppliedQuery],
  );

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    applyQuery(event?.target.value);
  }

  function handleFilterField(evennt: React.ChangeEvent<HTMLSelectElement>) {
    setFilterField(evennt.target.value);
  }

  function handleApplyQuery() {
    applyQuery('');
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterField}>
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
          value={appliedQuery}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {appliedQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleApplyQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
