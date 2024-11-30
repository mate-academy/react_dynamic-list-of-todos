import React from 'react';

type Props = {
  setStatus: (arg: string) => void;
  setInput: (arg: string) => void;
  input: string;
};

export const TodoFilter: React.FC<Props> = ({ setStatus, setInput, input }) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleDeleteQuery = () => {
    setInput('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => handleSelect(event)}
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
          onChange={event => handleQuery(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {input && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
