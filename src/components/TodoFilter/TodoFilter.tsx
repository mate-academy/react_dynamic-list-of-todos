import React, { useState } from 'react';

type Props = {
  selectHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void
  searchHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchHandlerReset: () => void
};

export const TodoFilter: React.FC<Props> = ({
  selectHandler,
  searchHandler,
  searchHandlerReset,
}) => {
  const [input, setInput] = useState('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={selectHandler}
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
          value={input}
          onChange={(event) => {
            searchHandler(event);
            setInput(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {input.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                searchHandlerReset();
                setInput('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
