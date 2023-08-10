import React, { useContext } from 'react';
import { TodosContext } from '../../TodosContext';
import { Sort } from '../../types/Sort';

type Props = {
  querry: string;
  onQuerry: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ querry, onQuerry }) => {
  const { setSortMode } = useContext(TodosContext);
  const handleClearButtonClick = () => {
    onQuerry('');
  };

  const handleQuerryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onQuerry(e.target.value);
  };

  const handleSortModeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSortMode(e.target.value as Sort);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSortModeChange}
          >
            <option value={Sort.All}>All</option>
            <option value={Sort.Active}>Active</option>
            <option value={Sort.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={querry}
          onChange={handleQuerryChange}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {querry && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clearSearchButton"
              onClick={handleClearButtonClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
