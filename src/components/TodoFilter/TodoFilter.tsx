// import { debounce } from 'cypress/types/lodash';
import React, { useCallback } from 'react';

type Props = {
  appliedQuery: string;
  setAppliedQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilterField: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter: React.FC<Props> = ({
  appliedQuery,
  setAppliedQuery,
  setFilterField,
}) => {
  const applyQuery = useCallback(
    (qwery: React.SetStateAction<string>) => setAppliedQuery(qwery),
    [setAppliedQuery],
  );

  function handleQweryChange(event: React.ChangeEvent<HTMLInputElement>) {
    applyQuery(event?.target.value);
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={evennt => setFilterField(evennt.target.value)}
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
          value={appliedQuery}
          onChange={handleQweryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {appliedQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => applyQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
