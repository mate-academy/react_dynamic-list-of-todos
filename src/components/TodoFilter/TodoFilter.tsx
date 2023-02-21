import React from 'react';

type Props = {
  inputState: string
  setInputState: (inputState: string) => void
  setToggleFilter: (toggleFilter: boolean | null) => void
};

export const TodoFilter: React.FC<Props> = ({
  inputState,
  setInputState,
  setToggleFilter,
}) => {
  const handleClearSearch = () => {
    setInputState('');
  };

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <div className="control">
        <div className="select">
          <select
            data-cy="statusSelect"
            onChange={e => setToggleFilter(e.target.value === 'completed')}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="control has-icons-left has-icons-right is-expanded">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputState}
          onChange={event => setInputState(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {inputState && (
          <div className="icon is-right">
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
              aria-label="Clear search input"
            />
          </div>
        )}
      </div>
    </form>
  );
};
