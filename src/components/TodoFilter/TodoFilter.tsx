import React, { useState } from 'react';

type Props = {
  query: (e: string) => void;
  filter: (e: string) => void;
  reject: () => void;
};

export const TodoFilter: React.FC<Props> = ({ query, filter, reject }) => {
  const [currentQuery, setCurrentQuerry] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setCurrentQuerry(value);

    query(value);
  };

  const handleReject = () => {
    setCurrentQuerry('');

    reject();
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => filter(e.currentTarget.value)}
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
          value={currentQuery}
          onChange={e => handleInput(e)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {currentQuery.length !== 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleReject}
            />
          </span>
        )}
      </p>
    </form>
  );
};
