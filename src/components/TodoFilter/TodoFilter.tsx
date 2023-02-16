import React, { Dispatch, SetStateAction } from 'react';
import { Options } from '../../types/Options';

type Props = {
  selectOption: (arg: string) => void,
  appliedQuery: string,
  setAppliedQuery: Dispatch<SetStateAction<string>>
};

export const TodoFilter: React.FC<Props> = React.memo(
  ({
    selectOption,
    appliedQuery,
    setAppliedQuery,
  }) => {
    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={(event) => selectOption(event.target.value)}
            >
              <option value={Options.ALL}>All</option>
              <option value={Options.ACTIVE}>Active</option>
              <option value={Options.COMPLETED}>Completed</option>
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
            onChange={(event) => {
              setAppliedQuery(event.target.value);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          { appliedQuery
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                aria-label="Clear Search"
                onClick={() => setAppliedQuery('')}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);
