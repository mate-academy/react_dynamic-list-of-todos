import React from 'react';

import { SelectedType } from '../../types/SelectedType';

type Props = {
  query: string;
  setQuery: (query: string) => void;
  selectedCondition: SelectedType;
  setSelectedCondition: (SelectedType: SelectedType) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  selectedCondition,
  setSelectedCondition,
}) => {
  const handleSelectedCondition = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCondition(event.target.value as SelectedType);
  };

  const handleClose = () => setQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedCondition}
            onChange={handleSelectedCondition}
          >
            <option value={SelectedType.ALL}>All</option>
            <option value={SelectedType.ACTIVE}>Active</option>
            <option value={SelectedType.COMPLETED}>Completed</option>
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
          onChange={event => setQuery(event.target.value.trimStart())}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClose}
            />
          </span>
        )}
      </p>
    </form>
  );
};
