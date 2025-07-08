import React, { useState } from 'react';

type Props = {
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  onReset: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  onChange,
  onSearch,
  onReset,
}) => {
  const [valueInput, setValueInput] = useState('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => {
              onChange(e.target.value);
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
          value={valueInput}
          onChange={e => {
            setValueInput(e.target.value);
            onSearch(e.target.value);
          }}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {valueInput && (
            <button
              onClick={() => {
                onReset();
                setValueInput('');
              }}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
