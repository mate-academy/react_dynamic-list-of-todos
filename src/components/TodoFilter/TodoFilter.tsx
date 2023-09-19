import React, { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  filter: string,
  setFilter: Dispatch<SetStateAction<string>>;
  setSearchText: Dispatch<SetStateAction<string>>,
  searchText: string,
};

// eslint-disable-next-line max-len
export const TodoFilter: React.FC<Props> = ({
  filter, setFilter, setSearchText, searchText,
}) => {
  const [handle, setHandle] = useState(false);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
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
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setHandle(true);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {handle && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearchText('');
                setHandle(false);
              }}
              aria-label="Clear Search"
            />
          )}
        </span>
      </p>
    </form>
  );
};
