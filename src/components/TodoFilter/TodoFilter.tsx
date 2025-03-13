import React, { useState } from 'react';

type Props = {
  onChangeQuery: (elem: string) => void;
  onChangeSelect: (elem: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  onChangeQuery,
  onChangeSelect,
}) => {
  const [query, setQuery] = useState('');
  const [select, setSelect] = useState('all');

  const clearedQuery = () => {
    setQuery('');
    onChangeQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            onChange={e => {
              setSelect(e.target.value);
              onChangeSelect(e.target.value);
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
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            onChangeQuery(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearedQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
