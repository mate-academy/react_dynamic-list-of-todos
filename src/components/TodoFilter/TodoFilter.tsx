import React, { useState } from 'react';

type Props = {
  onStatusChange: (value: string) => void;
  onQueryChange: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  onStatusChange,
  onQueryChange,
}) => {
  const [saveQuery, setSaveQuery] = useState('');

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;

    setSaveQuery(value);
    onQueryChange(value);
  };

  const handleDeleteQuery = () => {
    setSaveQuery('');
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => {
              onStatusChange(event.target.value);
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
          value={saveQuery}
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {saveQuery.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
