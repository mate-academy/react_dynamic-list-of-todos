import React, { useState } from 'react';

interface Props {
  sortingStatus: string;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setSearchValue: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  sortingStatus,
  onSelectChange,
  setSearchValue,
}) => {
  const [query, setQuery] = useState<string>('');
  const [isReset, setIsReset] = useState<boolean>(false);

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    setSearchValue(value);
    setIsReset(!!value);
  };

  const handleReset = () => {
    setQuery('');
    setSearchValue('');
    setIsReset(false);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortingStatus}
            onChange={onSelectChange}
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
          onChange={handleChanges}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {isReset && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
