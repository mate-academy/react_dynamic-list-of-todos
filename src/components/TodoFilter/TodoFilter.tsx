import React, { useState } from 'react';

type Props = {
  filterChange: (methodSort: string) => void;
  textChange: (text: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ filterChange, textChange }) => {
  const [text, setText] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    filterChange(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    textChange(event.target.value);
  };

  const handleClearSerch = () => {
    setText('');
    textChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
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
          value={text}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {text
            && (
              /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleClearSerch}
              />
            )}
        </span>
      </p>
    </form>
  );
};
